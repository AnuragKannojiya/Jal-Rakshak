import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Droplets, HeartHandshake, LineChart } from "lucide-react";
import { useGetSdgImpact, useListAlerts } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { data: sdgImpact } = useGetSdgImpact();
  const { data: alerts } = useListAlerts({ status: "active" });

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888051772-91f173f4e391?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
            Clean Water is Your Right.<br />Report, Track, Resolve.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            JalRakshak is India's premier civic-tech platform for monitoring water quality and resolving public water supply issues transparently.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="bg-secondary text-white hover:bg-secondary/90 w-full sm:w-auto">
              <Link href="/report">Report an Issue Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-slate-600 text-white hover:bg-white/10">
              <Link href="/map">View Live Map</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Active Alerts Banner */}
      {alerts && alerts.length > 0 && (
        <section className="bg-destructive/10 border-y border-destructive/20 py-4">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-destructive font-medium">
              <ShieldAlert className="h-5 w-5" />
              <span>Active Water Quality Alerts ({alerts.length})</span>
            </div>
            <Button variant="outline" size="sm" asChild className="border-destructive text-destructive hover:bg-destructive hover:text-white">
              <Link href="/alerts">View All Alerts</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Stats / SDG Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">Driving SDG 6: Clean Water & Sanitation</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Real-time impact metrics powered by citizen participation and government action.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-md bg-slate-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary">{sdgImpact?.complaintsResolved || "---"}</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Issues Resolved</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-md bg-slate-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-secondary">{sdgImpact?.areasImproved || "---"}</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Areas Improved</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-md bg-slate-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary">{sdgImpact?.citizensHelped || "---"}</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Citizens Helped</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-md bg-slate-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-destructive">{sdgImpact?.alertsIssued || "---"}</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Critical Alerts Handled</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">How JalRakshak Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">A transparent, accountable workflow ensuring your voice translates to action.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Report Issue</h3>
              <p className="text-slate-600">Submit a detailed report with photos and exact location. Our AI prioritizes critical health risks automatically.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <LineChart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Track Progress</h3>
              <p className="text-slate-600">Follow your complaint's journey just like a parcel. Get real-time updates as authorities assign and work on the issue.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <HeartHandshake className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Verify Resolution</h3>
              <p className="text-slate-600">Authorities upload proof of resolution. You verify and provide feedback to ensure accountability.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
