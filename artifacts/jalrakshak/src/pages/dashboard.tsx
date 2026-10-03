import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useListComplaints, useListAlerts, useGetArea, useListAreas } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { FileText, AlertTriangle, Droplets, MapPin, PlusCircle, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if not logged in
  if (!user) {
    setLocation("/login");
    return null;
  }

  const { data: myComplaints, isLoading: complaintsLoading } = useListComplaints({ myOnly: true, limit: 5 });
  const { data: alertsData, isLoading: alertsLoading } = useListAlerts({ status: "active", area: user.area || undefined });
  const { data: areasData } = useListAreas();
  
  const userArea = areasData?.find(a => a.areaName === user.area);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved": return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
      case "in_progress": return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case "assigned": return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Assigned</Badge>;
      case "rejected": return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge variant="outline" className="text-slate-600 border-slate-300">Under Review</Badge>;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "safe": return "text-green-600 bg-green-50";
      case "moderate": return "text-yellow-600 bg-yellow-50";
      case "risky": return "text-orange-600 bg-orange-50";
      case "unsafe": return "text-red-600 bg-red-50";
      default: return "text-slate-600 bg-slate-50";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">Welcome, {user.name}</h1>
          <p className="text-slate-600">Here's your civic action summary</p>
        </div>
        <Button asChild className="bg-secondary hover:bg-secondary/90">
          <Link href="/report">
            <PlusCircle className="mr-2 h-4 w-4" />
            Report Issue
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Active Alerts Card */}
        <Card className="border-none shadow-md bg-white overflow-hidden">
          <div className="h-2 bg-destructive w-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Active Area Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 mb-2">
              {alertsLoading ? "-" : (alertsData?.length || 0)}
            </div>
            {alertsData && alertsData.length > 0 ? (
              <p className="text-sm text-destructive font-medium">Action required in your area</p>
            ) : (
              <p className="text-sm text-green-600 font-medium">No active alerts in your area</p>
            )}
          </CardContent>
        </Card>

        {/* My Reports Card */}
        <Card className="border-none shadow-md bg-white overflow-hidden">
          <div className="h-2 bg-primary w-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              My Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 mb-2">
              {complaintsLoading ? "-" : (myComplaints?.total || 0)}
            </div>
            <p className="text-sm text-slate-500">Total issues reported by you</p>
          </CardContent>
        </Card>

        {/* Area Status Card */}
        <Card className="border-none shadow-md bg-white overflow-hidden">
          <div className="h-2 bg-secondary w-full"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-secondary" />
              {user.area || "Your Area"} Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userArea ? (
              <>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-slate-800">{userArea.waterScore}</span>
                  <span className="text-sm text-slate-500 mb-1">/100 Score</span>
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold uppercase ${getRiskColor(userArea.riskLevel)}`}>
                  {userArea.riskLevel}
                </div>
              </>
            ) : (
              <div className="py-2 text-sm text-slate-500">
                Area not set or data unavailable. <Link href="/water-status" className="text-secondary hover:underline">View all areas</Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Track the status of your recent submissions</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-primary">
                <Link href="/complaints">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {complaintsLoading ? (
                <div className="p-8 text-center text-slate-500">Loading reports...</div>
              ) : myComplaints?.complaints && myComplaints.complaints.length > 0 ? (
                <div className="divide-y">
                  {myComplaints.complaints.map((complaint) => (
                    <div key={complaint.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <Link href={`/complaints/${complaint.id}`} className="font-semibold text-primary hover:underline hover:text-secondary block mb-1">
                          {complaint.complaintTitle}
                        </Link>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(complaint.createdAt).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {complaint.area}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:justify-end">
                        {getStatusBadge(complaint.status)}
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/complaints/${complaint.id}`}>Track</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center flex flex-col items-center">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <CheckCircle2 className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-1">No reports yet</h3>
                  <p className="text-sm text-slate-500 mb-4">You haven't reported any water issues.</p>
                  <Button variant="outline" asChild>
                    <Link href="/report">Report an Issue</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-destructive/20 shadow-sm bg-slate-50">
            <CardHeader className="pb-3 border-b border-slate-200">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Community Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {alertsLoading ? (
                <div className="text-center text-slate-500 text-sm">Loading alerts...</div>
              ) : alertsData && alertsData.length > 0 ? (
                <div className="space-y-4">
                  {alertsData.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden">
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.level === 'critical' ? 'bg-destructive' : alert.level === 'danger' ? 'bg-orange-500' : alert.level === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                      <h4 className="font-semibold text-sm mb-1">{alert.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-2">{alert.description}</p>
                      <div className="flex justify-between items-center text-[10px] text-slate-500">
                        <span className="font-medium">{alert.area}</span>
                        <span>{new Date(alert.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {alertsData.length > 3 && (
                    <Button variant="link" className="w-full text-sm text-primary" asChild>
                      <Link href="/alerts">View all alerts</Link>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center text-sm text-slate-500 py-4">
                  No active alerts. Water quality is safe in your area.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}