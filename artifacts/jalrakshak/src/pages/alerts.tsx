import { useState } from "react";
import { useListAlerts, useListAreas } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin, ShieldAlert, Filter, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function Alerts() {
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: alertsData, isLoading } = useListAlerts({
    area: areaFilter !== "all" ? areaFilter : undefined
  });
  const { data: areasData } = useListAreas();

  const alerts = alertsData || [];
  
  const filteredAlerts = alerts.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAlertStyle = (level: string) => {
    switch (level) {
      case "critical": return { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: "text-red-600", accent: "bg-red-600" };
      case "danger": return { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", icon: "text-orange-600", accent: "bg-orange-500" };
      case "warning": return { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", icon: "text-yellow-600", accent: "bg-yellow-500" };
      case "info": return { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", icon: "text-blue-600", accent: "bg-blue-500" };
      default: return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-800", icon: "text-slate-600", accent: "bg-slate-500" };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary flex items-center gap-3 mb-2">
            <ShieldAlert className="h-8 w-8 text-destructive" /> 
            Community Alerts
          </h1>
          <p className="text-slate-600">Official advisories and warnings regarding water supply and safety.</p>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm mb-8">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center bg-slate-50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search alerts..." 
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto ml-auto">
            <Filter className="h-4 w-4 text-slate-500 hidden md:block" />
            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger className="w-full md:w-[220px] bg-white">
                <SelectValue placeholder="Filter by Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                {areasData?.map(area => (
                  <SelectItem key={area.id} value={area.areaName}>{area.areaName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">Loading alerts...</div>
      ) : filteredAlerts.length > 0 ? (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const style = getAlertStyle(alert.level);
            
            return (
              <Card key={alert.id} className={`${style.bg} ${style.border} relative overflow-hidden shadow-sm`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.accent}`}></div>
                <CardContent className="p-5 pl-7">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className={`h-5 w-5 ${style.icon}`} />
                        <h3 className={`text-lg font-bold ${style.text}`}>{alert.title}</h3>
                        {alert.status === "resolved" && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 ml-2">Resolved</Badge>
                        )}
                      </div>
                      <p className="text-slate-700 whitespace-pre-wrap">{alert.description}</p>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 text-sm text-slate-600 bg-white/50 p-3 rounded border border-white shrink-0">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">{alert.area}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(alert.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-lg">
          <ShieldAlert className="h-12 w-12 text-green-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-slate-700 mb-2">No Alerts Found</h3>
          <p className="text-slate-500">There are currently no active warnings for the selected criteria.</p>
        </div>
      )}
    </div>
  );
}