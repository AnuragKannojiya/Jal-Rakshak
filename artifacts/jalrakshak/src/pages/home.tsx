import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  FilePenLine,
  HeartHandshake,
  LineChart,
  MapPin,
  ShieldAlert,
  Waves,
} from "lucide-react";
import { useGetSdgImpact, useListAlerts } from "@workspace/api-client-react";

const features = [
  {
    href: "/report",
    icon: FilePenLine,
    index: "01",
    title: "Complaint reporting",
    text: "File geotagged water quality complaints with photo evidence and clear severity classification.",
  },
  {
    href: "/map",
    icon: MapPin,
    index: "02",
    title: "Live map view",
    text: "See area-wise water quality scores and active complaint clusters across cities.",
  },
  {
    href: "/alerts",
    icon: Bell,
    index: "03",
    title: "Community alerts",
    text: "Find real-time water quality alerts and boil advisories for your area.",
  },
  {
    href: "/dashboard",
    icon: LineChart,
    index: "04",
    title: "Progress tracking",
    text: "Follow resolution rates, risk levels, and SDG 6 progress in one place.",
  },
];

const workflow = [
  {
    number: "01",
    icon: ShieldAlert,
    title: "Report an issue",
    text: "Share the location, evidence, and urgency.",
  },
  {
    number: "02",
    icon: LineChart,
    title: "Track progress",
    text: "See updates as teams assign and resolve it.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Verify resolution",
    text: "Confirm the outcome and share feedback.",
  },
];

function MetricValue({ value, loading }: { value: string | number; loading: boolean }) {
  if (loading) {
    return <span className="inline-block h-8 w-16 animate-pulse rounded-md bg-white/10 align-middle" aria-label="Loading" />;
  }

  return <span>{value}</span>;
}

export default function Home() {
  const { data: sdgImpact, isLoading: isImpactLoading } = useGetSdgImpact();
  const { data: alerts, isLoading: areAlertsLoading } = useListAlerts({ status: "active" });
  const activeAlertCount = alerts?.length ?? 0;

  return (
    <div className="home-page flex min-h-full w-full flex-col overflow-hidden bg-[#081827] text-[#EAFBFC]">
      <section
        aria-labelledby="home-heading"
        className="relative isolate overflow-hidden bg-[#081827]"
      >
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center opacity-[0.16]"
          style={{ backgroundImage: "url('/jalrakshak-doc/hero.png')" }}
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(112deg,rgba(8,24,39,0.96)_8%,rgba(8,24,39,0.84)_45%,rgba(8,24,39,0.56)_100%)]" />
        <div className="jr-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />
        <div className="pointer-events-none absolute -right-56 -top-48 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(0,213,232,0.17)_0%,transparent_68%)]" />
        <div className="jr-drift pointer-events-none absolute -bottom-52 left-[28%] -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(185,232,100,0.08)_0%,transparent_70%)]" />

        <div className="container relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-5 pb-16 pt-20 sm:px-8 lg:pb-20 lg:pt-24">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <div className="max-w-3xl">
              <div className="jr-rise mb-7 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#7EE2E7] sm:text-xs">
                <span className="h-px w-10 bg-[#00D5E8]" />
                India&apos;s public water signal
              </div>
              <h1
                id="home-heading"
                className="jr-rise jr-rise-delay-1 font-display text-[4.25rem] font-bold leading-[0.9] tracking-[-0.075em] text-[#F1FCFC] sm:text-8xl lg:text-[clamp(5.5rem,9.5vw,9rem)]"
              >
                Jal<span className="text-[#00D5E8]">Rakshak</span>
                <span className="ml-2 inline-block h-3 w-3 rounded-full bg-[#B9E864] align-top shadow-[0_0_22px_rgba(185,232,100,0.45)] sm:h-4 sm:w-4" aria-hidden="true" />
              </h1>
              <p className="jr-rise jr-rise-delay-2 mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#B9D6DC] sm:text-xl lg:text-[1.4rem]">
                A civic-tech platform for monitoring water quality and resolving public water supply issues — transparently.
              </p>
              <div className="jr-rise jr-rise-delay-3 mt-10 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  data-testid="button-hero-report"
                  className="h-12 border border-[#7EE2E7]/30 bg-[#00D5E8] px-6 font-bold text-[#06202B] shadow-[0_12px_30px_rgba(0,213,232,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7EE2E7] hover:shadow-[0_16px_34px_rgba(0,213,232,0.24)]"
                >
                  <Link href="/report">
                    Report an issue
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  data-testid="button-hero-map"
                  className="h-12 border-[#8BC9D0]/35 bg-[#0E2A3A]/45 px-6 text-[#E7FAFA] transition duration-300 hover:-translate-y-0.5 hover:border-[#7EE2E7]/70 hover:bg-[#143A4C] hover:text-white"
                >
                  <Link href="/map">
                    Explore live map
                    <MapPin className="ml-2 h-4 w-4 text-[#7EE2E7]" />
                  </Link>
                </Button>
              </div>
              <div className="jr-rise jr-rise-delay-4 mt-14 flex items-center gap-4 text-xs text-[#88AAB2]">
                <span className="h-px w-16 bg-gradient-to-r from-[#00D5E8] to-transparent" />
                <span>Built for citizens. Accountable to communities.</span>
              </div>
            </div>

            <div className="jr-rise jr-rise-delay-3 relative mx-auto w-full max-w-[30rem] lg:mr-0">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#00D5E8]/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-[#7EE2E7]/25 bg-[#0B2638]/75 p-6 shadow-[0_28px_70px_rgba(0,8,18,0.35)] backdrop-blur-xl sm:p-8">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#B9E864]/[0.08] blur-2xl" />
                <div className="relative mb-9 flex items-center justify-between">
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#7EE2E7]">Network pulse</p>
                    <p className="mt-1 text-sm text-[#A9C5CA]">Civic water intelligence</p>
                  </div>
                  <span className="flex items-center gap-2 rounded-full border border-[#B9E864]/25 bg-[#B9E864]/[0.08] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#D6F59C]">
                    <span className="jr-pulse h-1.5 w-1.5 rounded-full bg-[#B9E864]" />
                    Live
                  </span>
                </div>
                <div className="relative flex items-center gap-5">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#00D5E8]/30 bg-[#00D5E8]/[0.11]">
                    <Waves className="h-10 w-10 text-[#00D5E8]" strokeWidth={1.35} />
                  </div>
                  <div>
                    <p className="font-display text-xl font-semibold text-[#F1FCFC]">Clean water for all</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#8EAEB5]">Transparent reporting for every Indian citizen.</p>
                  </div>
                </div>
                <div className="relative mt-8 space-y-4 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8EAEB5]">Areas improved</span>
                    <span className="font-display font-bold text-[#B9E864]" data-testid="text-areas-improved">
                      <MetricValue value={sdgImpact?.areasImproved ?? "—"} loading={isImpactLoading} />
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8EAEB5]">Active quality alerts</span>
                    <span className="font-display font-bold text-[#FFB98F]" data-testid="text-active-alerts">
                      <MetricValue value={activeAlertCount} loading={areAlertsLoading} />
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8EAEB5]">Global goal</span>
                    <span className="font-display font-bold text-[#7EE2E7]">SDG 6</span>
                  </div>
                </div>
                <div className="relative mt-7 flex items-center gap-2 text-xs text-[#87ABB2]">
                  <Activity className="h-3.5 w-3.5 text-[#00D5E8]" />
                  <span>Signals connect citizens to action</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container relative mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 pb-10 sm:grid-cols-3 sm:px-8 lg:pb-14">
          {[
            { value: sdgImpact?.complaintsResolved ?? "—", label: "Issues resolved", loading: isImpactLoading },
            { value: sdgImpact?.citizensHelped ?? "—", label: "Citizens helped", loading: isImpactLoading },
            { value: activeAlertCount, label: "Live quality alerts", loading: areAlertsLoading },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="jr-rise flex items-center gap-4 border-l border-[#7EE2E7]/30 pl-4"
              style={{ animationDelay: `${440 + index * 90}ms` }}
            >
              <div className="font-display text-3xl font-bold text-[#F1FCFC]" data-testid={`metric-${index}`}>
                <MetricValue value={stat.value} loading={stat.loading} />
              </div>
              <div className="text-sm text-[#86A9B1]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {activeAlertCount > 0 && (
        <section className="border-y border-[#FF9B7A]/25 bg-[#7E332E]/25" aria-label="Active water quality alerts">
          <div className="container mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-3 text-sm font-medium text-[#FFD2C4]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#FF9B7A]/35 bg-[#FF9B7A]/10">
                <ShieldAlert className="h-4 w-4 text-[#FFB99E]" />
              </span>
              <span data-testid="status-active-alerts">
                {activeAlertCount} active water quality {activeAlertCount === 1 ? "alert" : "alerts"} require attention
              </span>
            </div>
            <Button variant="outline" size="sm" asChild data-testid="button-view-alerts" className="border-[#FFB99E]/40 bg-transparent text-[#FFE6DE] hover:bg-[#FF9B7A]/15 hover:text-white">
              <Link href="/alerts">View all alerts <ArrowUpRight className="ml-2 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </section>
      )}

      <section className="relative bg-[#0B2133] py-20 sm:py-28" aria-labelledby="features-heading">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00D5E8]/40 to-transparent" />
        <div className="container relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 border-t border-[#7EE2E7]/20 pt-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#7EE2E7]">One civic signal, many outcomes</div>
              <h2 id="features-heading" className="mt-3 max-w-xl font-display text-4xl font-bold tracking-tight text-[#F1FCFC] sm:text-5xl">See the issue. Follow the action.</h2>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-[#7EE2E7]/25 bg-[#00D5E8]/[0.08] px-4 py-2 text-sm font-medium text-[#A8EEF1] sm:self-auto">
              <CheckCircle2 className="h-4 w-4 text-[#B9E864]" />
              SDG 6 aligned
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                data-testid={`link-feature-${feature.index}`}
                className="group relative overflow-hidden rounded-2xl border border-[#7EE2E7]/15 bg-[#123047]/55 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#7EE2E7]/55 hover:bg-[#173D54] focus-visible:-translate-y-1"
              >
                <span className="absolute right-5 top-5 font-mono text-xs text-[#5E8B95]">{feature.index}</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00D5E8]/20 bg-[#00D5E8]/[0.1] text-[#00D5E8] transition duration-300 group-hover:border-[#B9E864]/35 group-hover:bg-[#B9E864]/[0.12] group-hover:text-[#D6F59C]">
                  <feature.icon className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <h3 className="mt-7 font-display text-xl font-semibold text-[#F1FCFC]">{feature.title}</h3>
                <p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-[#8EAEB5]">{feature.text}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7EE2E7]">
                  Explore <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#7EE2E7]/15 bg-[#081827] py-20 sm:py-28" aria-labelledby="workflow-heading">
        <div className="container mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <div className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#7EE2E7]">A transparent workflow</div>
            <h2 id="workflow-heading" className="mt-4 max-w-md font-display text-4xl font-bold tracking-tight text-[#F1FCFC] sm:text-5xl">Your voice translates to action.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-[#8EAEB5]">From the first report to verified resolution, JalRakshak keeps every step visible to citizens and authorities.</p>
            <Link href="/report" data-testid="link-workflow-report" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#B9E864] transition hover:gap-3 hover:text-[#D6F59C]">
              Start with a report <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {workflow.map((step) => (
              <div key={step.number} className="rounded-2xl border border-[#7EE2E7]/15 bg-[#0E2A3A]/60 p-5 transition duration-300 hover:border-[#7EE2E7]/35 hover:bg-[#123447]">
                <div className="flex items-center justify-between">
                  <step.icon className="h-6 w-6 text-[#00D5E8]" strokeWidth={1.6} />
                  <span className="font-mono text-xs text-[#5E8B95]">{step.number}</span>
                </div>
                <h3 className="mt-8 font-display text-lg font-semibold text-[#F1FCFC]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8EAEB5]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[#7EE2E7]/15 bg-[#0B2638] py-16 sm:py-20">
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#00D5E8]/[0.08] blur-3xl" />
        <div className="container relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-center">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#7EE2E7]">Make the next signal count</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-[#F1FCFC] sm:text-4xl">A clearer report creates a faster response.</h2>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild data-testid="button-final-report" className="bg-[#B9E864] font-bold text-[#09202A] hover:bg-[#D6F59C]">
              <Link href="/report">Report an issue <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" data-testid="button-final-map" className="border-[#7EE2E7]/35 bg-transparent text-[#E7FAFA] hover:bg-[#173D54] hover:text-white">
              <Link href="/map">Open live map</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}