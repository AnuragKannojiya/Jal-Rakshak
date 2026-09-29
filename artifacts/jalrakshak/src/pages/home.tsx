import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Droplets, HeartHandshake, LineChart, MapPin, Bell, FilePenLine, ArrowUpRight, Activity } from "lucide-react";
import { useGetSdgImpact, useListAlerts } from "@workspace/api-client-react";

export default function Home() {
  const { data: sdgImpact } = useGetSdgImpact();
  const { data: alerts } = useListAlerts({ status: "active" });

  return (
    <div className="home-page flex min-h-full w-full flex-col overflow-hidden bg-[#0C1A2E] text-[#F0F9FF]">
      <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-[#0C1A2E]">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-[0.18]"
          style={{ backgroundImage: "url('/jalrakshak-doc/hero.png')" }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(12,26,46,0.28)_0%,rgba(12,26,46,0.78)_66%,#0C1A2E_100%)]" />
        <div className="absolute -right-32 -top-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(0,180,216,0.16)_0%,transparent_68%)]" />
        <div className="absolute -bottom-48 -left-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(0,180,216,0.1)_0%,transparent_70%)]" />

        <div className="container relative mx-auto flex min-h-[calc(100vh-4rem)] items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid w-full items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#00B4D8] sm:text-sm">
                <span className="h-px w-10 bg-[#00B4D8]" />
                India&apos;s Water Quality Initiative
              </div>
              <h1 className="font-display text-6xl font-extrabold leading-[0.94] tracking-[-0.06em] text-[#F0F9FF] sm:text-7xl lg:text-[clamp(5rem,9vw,9rem)]">
                Jal<span className="text-[#00B4D8]">Rakshak</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#BAE6FD] sm:text-xl lg:text-2xl">
                Civic-tech platform for monitoring water quality and resolving public water supply issues — transparently.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="h-12 bg-[#00B4D8] px-6 text-[#071525] shadow-[0_0_30px_rgba(0,180,216,0.2)] hover:bg-[#7DD3FC]">
                  <Link href="/report">
                    Report an Issue
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-12 border-[#7DD3FC]/40 bg-white/[0.03] px-6 text-[#E0F2FE] hover:bg-white/10 hover:text-white">
                  <Link href="/map">Explore Live Map</Link>
                </Button>
              </div>
              <div className="mt-14 h-px w-32 bg-gradient-to-r from-[#00B4D8] to-transparent" />
            </div>

            <div className="relative mx-auto w-full max-w-md lg:mr-0">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#00B4D8]/10 blur-2xl" />
              <div className="relative rounded-[1.5rem] border border-[#00B4D8]/25 bg-white/[0.045] p-7 shadow-2xl backdrop-blur-xl sm:p-10">
                <div className="mb-10 flex items-center justify-between">
                  <span className="rounded-full border border-[#00B4D8]/30 bg-[#00B4D8]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7DD3FC]">
                    Government Civic Platform
                  </span>
                  <Activity className="h-5 w-5 text-[#00B4D8]" />
                </div>
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#00B4D8]/50 bg-[#00B4D8]/15 shadow-[0_0_36px_rgba(0,180,216,0.18)]">
                  <Droplets className="h-14 w-14 text-[#00B4D8]" strokeWidth={1.4} />
                </div>
                <h2 className="mt-7 text-center font-display text-2xl font-semibold text-[#F0F9FF]">Clean Water for All</h2>
                <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-relaxed text-slate-400">
                  Transparent civic reporting for every Indian citizen
                </p>
                <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-center">
                  <div>
                    <div className="font-display text-2xl font-bold text-[#00B4D8]">{sdgImpact?.areasImproved ?? "—"}</div>
                    <div className="mt-1 text-xs text-slate-400">Areas improved</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-[#00B4D8]">SDG 6</div>
                    <div className="mt-1 text-xs text-slate-400">Goal aligned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto grid grid-cols-1 gap-5 px-4 pb-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { value: sdgImpact?.complaintsResolved ?? "—", label: "Issues resolved" },
            { value: sdgImpact?.citizensHelped ?? "—", label: "Citizens helped" },
            { value: alerts?.length ?? "—", label: "Live quality alerts" },
          ].map((stat) => (
            <div key={stat.label} className="border-l border-[#00B4D8]/30 pl-4">
              <div className="font-display text-3xl font-bold text-[#F0F9FF]">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {alerts && alerts.length > 0 && (
        <section className="border-y border-red-400/20 bg-red-500/[0.08]">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-sm font-medium text-red-200">
              <ShieldAlert className="h-5 w-5 text-red-300" />
              <span>{alerts.length} active water quality {alerts.length === 1 ? "alert" : "alerts"} require attention</span>
            </div>
            <Button variant="outline" size="sm" asChild className="border-red-300/40 bg-transparent text-red-100 hover:bg-red-400/15 hover:text-white">
              <Link href="/alerts">View all alerts</Link>
            </Button>
          </div>
        </section>
      )}

      <section className="bg-[linear-gradient(160deg,#0F2340_0%,#0C1A2E_60%,#091422_100%)] py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 border-t border-[#00B4D8]/20 pt-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00B4D8]">Platform overview</div>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#F0F9FF] sm:text-5xl">Features &amp; impact</h2>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-[#00B4D8]/25 bg-[#00B4D8]/10 px-4 py-2 text-sm font-medium text-[#7DD3FC] sm:self-auto">
              <span className="h-2 w-2 rounded-full bg-[#00B4D8] shadow-[0_0_12px_#00B4D8]" />
              SDG 6 aligned
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/report", icon: FilePenLine, title: "Complaint Reporting", text: "File geotagged water quality complaints with photo evidence and severity classification." },
              { href: "/map", icon: MapPin, title: "Live Map View", text: "See area-wise water quality scores and active complaint clusters across cities." },
              { href: "/alerts", icon: Bell, title: "Community Alerts", text: "Get real-time water quality alerts and boil advisories for your area." },
              { href: "/dashboard", icon: LineChart, title: "Progress Tracking", text: "Follow resolution rates, risk levels, and SDG 6 progress in one place." },
            ].map((feature) => (
              <Link key={feature.title} href={feature.href} className="group rounded-2xl border border-[#00B4D8]/20 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#00B4D8]/50 hover:bg-[#00B4D8]/[0.08]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00B4D8]/15 text-[#00B4D8] transition group-hover:bg-[#00B4D8]/25">
                  <feature.icon className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-[#F0F9FF]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{feature.text}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#00B4D8]">
                  Explore <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#00B4D8]/15 bg-[#091422] py-20">
        <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00B4D8]">A transparent workflow</div>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#F0F9FF]">Your voice translates to action.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-slate-400">From the first report to verified resolution, JalRakshak keeps every step visible to citizens and authorities.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { number: "01", icon: ShieldAlert, title: "Report issue", text: "Share the location, evidence, and urgency." },
              { number: "02", icon: LineChart, title: "Track progress", text: "See updates as teams assign and resolve it." },
              { number: "03", icon: HeartHandshake, title: "Verify resolution", text: "Confirm the outcome and share feedback." },
            ].map((step) => (
              <div key={step.number} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <step.icon className="h-6 w-6 text-[#00B4D8]" strokeWidth={1.6} />
                  <span className="font-mono text-xs text-slate-500">{step.number}</span>
                </div>
                <h3 className="mt-8 font-display text-lg font-semibold text-[#F0F9FF]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
