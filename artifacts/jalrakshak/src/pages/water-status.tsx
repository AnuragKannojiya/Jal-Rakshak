import { useListAreas } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Activity, Droplets, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function WaterStatus() {
  const { data: areas, isLoading } = useListAreas();

  const getRiskDetails = (level: string) => {
    switch (level) {
      case "safe": 
        return { color: "text-green-600", bg: "bg-green-50", border: "border-green-200", bar: "bg-green-500", icon: "✅" };
      case "moderate": 
        return { color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", bar: "bg-yellow-500", icon: "⚠️" };
      case "risky": 
        return { color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", bar: "bg-orange-500", icon: "🔴" };
      case "unsafe": 
        return { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", bar: "bg-red-600", icon: "🚨" };
      default: 
        return { color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200", bar: "bg-slate-400", icon: "❓" };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Area Water Quality Status</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Live monitoring of water quality metrics across all municipal zones. Scores are calculated based on recent tests and citizen reports.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 flex items-start gap-3">
        <Info className="text-blue-500 h-5 w-5 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <strong>Understanding Water Scores:</strong> A score of 85-100 indicates safe, potable water. 70-84 means moderate quality (boiling advised). 50-69 represents risky conditions, and below 50 is unsafe for consumption without heavy treatment.
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-slate-500">Loading area status...</div>
      ) : areas && areas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => {
            const risk = getRiskDetails(area.riskLevel);
            
            return (
              <Card key={area.id} className={`overflow-hidden border-t-4 border-t-transparent ${risk.border} shadow-sm hover:shadow-md transition-shadow`}>
                <div className={`h-1.5 w-full ${risk.bar}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-slate-400" />
                        {area.areaName}
                      </CardTitle>
                      <div className="mt-2">
                        <Badge variant="outline" className={`${risk.bg} ${risk.color} font-bold border-none`}>
                          {risk.icon} {area.riskLevel.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-black ${risk.color}`}>{area.waterScore}</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Score / 100</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 mb-4">
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span className="text-slate-500">Quality Indicator</span>
                    </div>
                    <Progress value={area.waterScore} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                        <Droplets className="h-3 w-3" /> Status Tag
                      </div>
                      <div className="font-medium text-sm text-slate-800">{area.qualityTag}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                        <Activity className="h-3 w-3" /> Active Issues
                      </div>
                      <div className="font-medium text-sm text-slate-800">{area.activeComplaints} Reports</div>
                    </div>
                  </div>
                  
                  {area.notes && (
                    <div className="mt-4 p-3 bg-slate-50 rounded text-sm text-slate-600 border border-slate-100">
                      <strong>Note:</strong> {area.notes}
                    </div>
                  )}
                  
                  <div className="mt-4 text-xs text-slate-400 text-right">
                    Last updated: {new Date(area.lastUpdated).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-12 bg-slate-50 rounded-lg">
          No area data available at the moment.
        </div>
      )}
    </div>
  );
}