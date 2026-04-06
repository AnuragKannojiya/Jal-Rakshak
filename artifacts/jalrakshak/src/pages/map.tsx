import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useGetComplaintsMap } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";

// Fix Leaflet's default icon path issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom colored icons for different priorities
const createIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const icons = {
  critical: createIcon('red'),
  high: createIcon('orange'),
  medium: createIcon('yellow'),
  low: createIcon('blue'),
  resolved: createIcon('green')
};

// Component to handle map center changes
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapView() {
  const { data: pins, isLoading } = useGetComplaintsMap();
  const [filter, setFilter] = useState("all");
  
  // Default center to India (roughly)
  const defaultCenter: [number, number] = [20.5937, 78.9629];
  
  const validPins = pins?.filter(p => p.latitude && p.longitude) || [];
  
  const filteredPins = filter === "all" 
    ? validPins 
    : filter === "resolved" 
      ? validPins.filter(p => p.status === "resolved")
      : validPins.filter(p => p.priority === filter && p.status !== "resolved");

  const getIcon = (pin: any) => {
    if (pin.status === "resolved") return icons.resolved;
    return icons[pin.priority as keyof typeof icons] || icons.low;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="bg-white border-b p-4 shadow-sm z-10 relative">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-primary">Live Issues Map</h1>
            <p className="text-sm text-slate-500">Real-time geographical view of reported water problems</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${filter === "all" ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 hover:bg-slate-100"}`}
            >
              All Active
            </button>
            <button 
              onClick={() => setFilter("critical")}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${filter === "critical" ? "bg-red-600 text-white border-red-600" : "bg-white text-red-600 border-red-200 hover:bg-red-50"}`}
            >
              Critical
            </button>
            <button 
              onClick={() => setFilter("high")}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${filter === "high" ? "bg-orange-500 text-white border-orange-500" : "bg-white text-orange-600 border-orange-200 hover:bg-orange-50"}`}
            >
              High
            </button>
            <button 
              onClick={() => setFilter("resolved")}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${filter === "resolved" ? "bg-green-600 text-white border-green-600" : "bg-white text-green-600 border-green-200 hover:bg-green-50"}`}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 relative z-0">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-slate-500 font-medium">Loading map data...</p>
            </div>
          </div>
        ) : (
          <MapContainer 
            center={validPins.length > 0 ? [validPins[0].latitude, validPins[0].longitude] : defaultCenter} 
            zoom={5} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {validPins.length > 0 && <MapController center={[validPins[0].latitude, validPins[0].longitude]} />}
            
            {filteredPins.map((pin) => (
              <Marker 
                key={pin.id} 
                position={[pin.latitude, pin.longitude]}
                icon={getIcon(pin)}
              >
                <Popup>
                  <div className="p-1 min-w-[200px]">
                    <h3 className="font-bold text-sm mb-1">{pin.complaintTitle}</h3>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline" className="text-[10px] px-1 py-0">{pin.issueType}</Badge>
                      <Badge variant="outline" className="text-[10px] px-1 py-0">{pin.area}</Badge>
                    </div>
                    <Link href={`/complaints/${pin.id}`} className="text-xs text-blue-600 hover:underline block mt-2 font-medium">
                      View full details →
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}