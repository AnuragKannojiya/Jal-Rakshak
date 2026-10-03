import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useGetAnalyticsTrends, useGetAnalyticsCategories, useGetAnalyticsAreas } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, PieChart as PieChartIcon, Map } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";

export default function AdminAnalytics() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user || user.role !== "admin") {
    setLocation("/dashboard");
    return null;
  }

  const { data: trends } = useGetAnalyticsTrends({ weeks: 8 });
  const { data: categories } = useGetAnalyticsCategories();
  const { data: areas } = useGetAnalyticsAreas();

  const COLORS = ['#0F172A', '#06B6D4', '#EF4444', '#F59E0B', '#8B5CF6', '#10B981', '#64748B'];

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-display text-primary">Platform Analytics</h1>
            <p className="text-slate-500 text-sm">Data-driven insights for operations planning</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                <TrendingUp className="h-5 w-5 text-primary" /> Complaint Resolution Trends (8 Weeks)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 h-[350px]">
              {trends ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    <Line type="monotone" name="Submitted" dataKey="submitted" stroke="#0F172A" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" name="Resolved" dataKey="resolved" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : <div className="h-full flex items-center justify-center text-slate-400">Loading chart...</div>}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                  <PieChartIcon className="h-5 w-5 text-secondary" /> Issue Category Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 h-[350px]">
                {categories ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categories}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="count"
                        nameKey="issueType"
                      >
                        {categories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number, name: string, props: any) => [`${value} (${props.payload.percentage.toFixed(1)}%)`, name]}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <div className="h-full flex items-center justify-center text-slate-400">Loading chart...</div>}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                  <Map className="h-5 w-5 text-orange-500" /> High-Risk Area Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 h-[350px]">
                {areas ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={areas.slice(0, 5)} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis dataKey="areaName" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar name="Total Complaints" dataKey="total" fill="#0F172A" radius={[0, 4, 4, 0]} barSize={20} />
                      <Bar name="Critical Issues" dataKey="critical" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <div className="h-full flex items-center justify-center text-slate-400">Loading chart...</div>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}