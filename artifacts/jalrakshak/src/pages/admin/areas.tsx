import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useListAreas, useUpdateArea } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, Edit2, Check } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getListAreasQueryKey } from "@workspace/api-client-react";

export default function AdminAreas() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  if (!user || user.role !== "admin") {
    setLocation("/dashboard");
    return null;
  }

  const { data: areas, isLoading } = useListAreas();
  const updateAreaMutation = useUpdateArea();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{
    waterScore: number;
    riskLevel: any;
    qualityTag: string;
  }>({ waterScore: 0, riskLevel: "safe", qualityTag: "" });

  const startEdit = (area: any) => {
    setEditingId(area.id);
    setEditForm({
      waterScore: area.waterScore,
      riskLevel: area.riskLevel,
      qualityTag: area.qualityTag || "",
    });
  };

  const saveEdit = (id: number) => {
    updateAreaMutation.mutate({ id, data: editForm }, {
      onSuccess: () => {
        toast({ title: "Area updated successfully" });
        setEditingId(null);
        queryClient.invalidateQueries({ queryKey: getListAreasQueryKey() });
      },
      onError: (err) => {
        toast({ title: "Failed to update area", description: "Operation failed", variant: "destructive" });
      }
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "safe": return "bg-green-100 text-green-800";
      case "moderate": return "bg-yellow-100 text-yellow-800";
      case "risky": return "bg-orange-100 text-orange-800";
      case "unsafe": return "bg-red-100 text-red-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-display text-primary">Manage Service Areas</h1>
            <p className="text-slate-500 text-sm">Update water quality scores and risk levels</p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-12 text-slate-500">Loading areas...</div>
            ) : areas && areas.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Area Name</TableHead>
                      <TableHead>Water Score (0-100)</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Quality Tag</TableHead>
                      <TableHead>Active Issues</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {areas.map(area => (
                      <TableRow key={area.id}>
                        <TableCell className="font-medium">{area.areaName}</TableCell>
                        
                        <TableCell>
                          {editingId === area.id ? (
                            <Input 
                              type="number" 
                              min="0" max="100" 
                              className="w-20 h-8"
                              value={editForm.waterScore}
                              onChange={(e) => setEditForm({...editForm, waterScore: parseInt(e.target.value) || 0})}
                            />
                          ) : (
                            <span className="font-bold text-lg">{area.waterScore}</span>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          {editingId === area.id ? (
                            <Select value={editForm.riskLevel} onValueChange={(val: any) => setEditForm({...editForm, riskLevel: val})}>
                              <SelectTrigger className="h-8 w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="safe">Safe</SelectItem>
                                <SelectItem value="moderate">Moderate</SelectItem>
                                <SelectItem value="risky">Risky</SelectItem>
                                <SelectItem value="unsafe">Unsafe</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge className={getRiskColor(area.riskLevel)} variant="outline">{area.riskLevel.toUpperCase()}</Badge>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          {editingId === area.id ? (
                            <Input 
                              className="h-8 min-w-[120px]"
                              value={editForm.qualityTag}
                              onChange={(e) => setEditForm({...editForm, qualityTag: e.target.value})}
                              placeholder="e.g. Potable"
                            />
                          ) : (
                            <span className="text-sm text-slate-600">{area.qualityTag}</span>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          <Badge variant="secondary">{area.activeComplaints}</Badge>
                        </TableCell>
                        
                        <TableCell className="text-right">
                          {editingId === area.id ? (
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>Cancel</Button>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => saveEdit(area.id)} disabled={updateAreaMutation.isPending}>
                                {updateAreaMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin"/> : <Check className="h-4 w-4 mr-1"/>} Save
                              </Button>
                            </div>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => startEdit(area)}>
                              <Edit2 className="h-4 w-4 mr-1" /> Edit
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">No areas configured.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}