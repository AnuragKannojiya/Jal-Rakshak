import { useAuth } from "@/lib/auth";
import { Link, useLocation } from "wouter";
import { useGetAnalyticsSummary } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, MapPin, CheckCircle, Clock, ShieldAlert, BarChart3, Users, LayoutDashboard, LayoutGrid } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user || user.role !== "admin") {
    setLocation("/dashboard");
    return null;
  }

  const { data: summary, isLoading } = useGetAnalyticsSummary();

  const adminLinks = [
    { href: "/admin/complaints", label: "Complaints", icon: FileText, desc: "Manage and resolve citizen reports", color: "bg-blue-500" },
    { href: "/admin/areas", label: "Areas", icon: MapPin, desc: "Update area water scores and status", color: "bg-emerald-500" },
    { href: "/admin/alerts", label: "Alerts", icon: AlertTriangle, desc: "Issue community warnings", color: "bg-orange-500" },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3, desc: "View trends and performance", color: "bg-purple-500" },
    { href: "/admin/users", label: "Users", icon: Users, desc: "View registered citizens", color: "bg-slate-700" },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 hidden md:block border-r border-slate-800 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-secondary" />
            Admin Portal
          </h2>
          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 bg-secondary/20 text-secondary rounded-md font-medium">
              <LayoutDashboard className="h-5 w-5" /> Dashboard
            </Link>
            {adminLinks.map(link => (
              <Link key={link.href} href={link.href} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 rounded-md font-medium transition-colors">
                <link.icon className="h-5 w-5" /> {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-primary">Authority Dashboard</h1>
          <p className="text-slate-600">Welcome, {user.name}. Here's the current operations overview.</p>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-slate-500">Loading metrics...</div>
        ) : summary ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-l-4 border-l-blue-500 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 uppercase">Total Complaints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-800">{summary.totalComplaints}</div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-green-600 font-medium">{summary.resolvedComplaints} resolved</span>
                    <span className="text-slate-500">{summary.pendingComplaints} pending</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 uppercase">Critical Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{summary.criticalComplaints}</div>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Require immediate action</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 uppercase">Resolution Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-800">{summary.resolutionRate}%</div>
                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Avg {summary.avgResolutionHours}h resolution time
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 uppercase">Active Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">{summary.activeAlerts}</div>
                  <p className="text-xs text-slate-500 mt-2">Across {summary.unsafeAreas} risky/unsafe areas</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-secondary" /> Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {adminLinks.map(link => (
                <Link key={link.href} href={link.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200 h-full">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${link.color} text-white shrink-0`}>
                        <link.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1">{link.label}</h3>
                        <p className="text-sm text-slate-500 leading-snug">{link.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}