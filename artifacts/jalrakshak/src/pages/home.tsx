import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Droplets, HeartHandshake, LineChart } from "lucide-react";
import { useGetSdgImpact, useListAlerts } from "@workspace/api-client-react";

export default function Home() {
  const { data: sdgImpact } = useGetSdgImpact();
  const { data: alerts } = useListAlerts({ status: "active" });

  return (
    <div className="flex flex-col w-full">

      {/* Hero — faithful to slide 1 design */}
      <section className="relative overflow-hidden py-24 lg:py-36" style={{ background: "linear-gradient(135deg, #0C1A2E 0%, #0F2B45 50%, #0A2233 100%)" }}>
        {/* Radial glow accents */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,180,216,0.10) 0%, transparent 65%)", transform: "translate(20%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,180,216,0.07) 0%, transparent 65%)", transform: "translate(-20%, 30%)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left: hero text matching slide typography */}
            <div className="flex-1 min-w-0">
              {/* Eyebrow label */}
              <div className="mb-5">
                <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "#00B4D8" }}>
                  India's Water Quality Initiative
                </span>
              </div>

              {/* Large split-color headline */}
              <h1 className="font-display font-extrabold leading-none tracking-tight mb-6" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: "0.95", color: "#F0F9FF" }}>
                Jal<span style={{ color: "#00B4D8" }}>Rakshak</span>
              </h1>

              <p className="text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-lg" style={{ color: "#BAE6FD" }}>
                Civic-tech platform for monitoring water quality and resolving public water supply issues — transparently.
              </p>

              {/* Teal gradient rule */}
              <div className="mb-8 h-[3px] w-20 rounded-full" style={{ background: "linear-gradient(90deg, #00B4D8, transparent)" }} />

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button asChild size="lg" className="font-semibold px-8 text-base" style={{ background: "#00B4D8", color: "#fff" }}>
                  <Link href="/report">Report an Issue Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-medium px-8 text-base" style={{ borderColor: "rgba(0,180,216,0.4)", color: "#BAE6FD", background: "rgba(0,180,216,0.05)" }}>
                  <Link href="/map">View Live Map</Link>
                </Button>
              </div>
            </div>

            {/* Right: glass card matching slide design */}
            <div className="flex-shrink-0 w-full lg:w-80">
              <div className="rounded-2xl p-8 flex flex-col items-center text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,180,216,0.25)", backdropFilter: "blur(12px)" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(0,180,216,0.12)", border: "2px solid rgba(0,180,216,0.35)" }}>
                  <Droplets className="h-9 w-9" style={{ color: "#00B4D8" }} />
                </div>
                <h2 className="font-display font-bold text-xl mb-3" style={{ color: "#F0F9FF" }}>Clean Water for All</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                  Transparent civic reporting for every Indian citizen — from complaint to resolution.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom stats bar — from slide design */}
          <div className="mt-16 pt-10 border-t flex flex-wrap gap-x-12 gap-y-6" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div>
              <div className="font-display font-bold text-4xl text-foreground">10+</div>
              <div className="text-sm mt-1" style={{ color: "#94A3B8" }}>Active Areas</div>
            </div>
            <div className="w-px self-stretch" style={{ background: "rgba(148,163,184,0.2)" }} />
            <div>
              <div className="font-display font-bold text-4xl" style={{ color: "#00B4D8" }}>SDG 6</div>
              <div className="text-sm mt-1" style={{ color: "#94A3B8" }}>UN Goal Aligned</div>
            </div>
            <div className="w-px self-stretch" style={{ background: "rgba(148,163,184,0.2)" }} />
            <div>
              <div className="font-display font-bold text-4xl text-foreground">Real-time</div>
              <div className="text-sm mt-1" style={{ color: "#94A3B8" }}>Quality Alerts</div>
            </div>
            <div className="w-px self-stretch hidden sm:block" style={{ background: "rgba(148,163,184,0.2)" }} />
            <div>
              <div className="font-display font-bold text-4xl text-foreground">{sdgImpact?.complaintsResolved ?? "---"}</div>
              <div className="text-sm mt-1" style={{ color: "#94A3B8" }}>Issues Resolved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Alerts Banner */}
      {alerts && alerts.length > 0 && (
        <section className="py-4 border-y" style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.2)" }}>
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 font-medium text-destructive">
              <ShieldAlert className="h-5 w-5" />
              <span>Active Water Quality Alerts ({alerts.length})</span>
            </div>
            <Button variant="outline" size="sm" asChild className="border-destructive text-destructive hover:bg-destructive hover:text-white">
              <Link href="/alerts">View All Alerts</Link>
            </Button>
          </div>
        </section>
      )}

      {/* SDG Impact Stats */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "#00B4D8" }}>Impact Metrics</p>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">Driving SDG 6: Clean Water &amp; Sanitation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Real-time impact metrics powered by citizen participation and government action.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: sdgImpact?.complaintsResolved, label: "Issues Resolved", accent: false },
              { value: sdgImpact?.areasImproved, label: "Areas Improved", accent: true },
              { value: sdgImpact?.citizensHelped, label: "Citizens Helped", accent: false },
              { value: sdgImpact?.alertsIssued, label: "Alerts Handled", accent: false },
            ].map(({ value, label, accent }) => (
              <div key={label} className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,180,216,0.15)" }}>
                <div className="font-display font-bold text-4xl mb-2" style={{ color: accent ? "#00B4D8" : "#F0F9FF" }}>
                  {value ?? "---"}
                </div>
                <div className="text-sm font-medium text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "#00B4D8" }}>The Process</p>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">How JalRakshak Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A transparent, accountable workflow ensuring your voice translates to action.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl p-8 flex flex-col items-center text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,180,216,0.15)" }}>
              <div className="h-14 w-14 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(0,180,216,0.12)", border: "1px solid rgba(0,180,216,0.25)" }}>
                <ShieldAlert className="h-7 w-7" style={{ color: "#00B4D8" }} />
              </div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#00B4D8" }}>Step 01</div>
              <h3 className="font-display font-bold text-lg mb-3 text-foreground">Report Issue</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Submit a detailed report with photos and exact location. Our system prioritizes critical health risks automatically.</p>
            </div>

            <div className="rounded-xl p-8 flex flex-col items-center text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,180,216,0.15)" }}>
              <div className="h-14 w-14 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(0,180,216,0.12)", border: "1px solid rgba(0,180,216,0.25)" }}>
                <LineChart className="h-7 w-7" style={{ color: "#00B4D8" }} />
              </div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#00B4D8" }}>Step 02</div>
              <h3 className="font-display font-bold text-lg mb-3 text-foreground">Track Progress</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Follow your complaint's journey in real time. Get updates as authorities assign and work on the issue.</p>
            </div>

            <div className="rounded-xl p-8 flex flex-col items-center text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,180,216,0.15)" }}>
              <div className="h-14 w-14 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(0,180,216,0.12)", border: "1px solid rgba(0,180,216,0.25)" }}>
                <HeartHandshake className="h-7 w-7" style={{ color: "#00B4D8" }} />
              </div>
              <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#00B4D8" }}>Step 03</div>
              <h3 className="font-display font-bold text-lg mb-3 text-foreground">Verify Resolution</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Authorities upload proof of resolution. You verify and provide feedback to ensure full accountability.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
