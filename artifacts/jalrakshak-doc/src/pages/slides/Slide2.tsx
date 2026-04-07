export default function Slide2() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "linear-gradient(160deg, #0F2340 0%, #0C1A2E 60%, #091422 100%)" }}>

      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,180,216,0.07) 0%, transparent 70%)" }} />

      <div className="absolute top-0 left-0 w-full h-[0.4vh]" style={{ background: "linear-gradient(90deg, transparent, #00B4D8, transparent)" }} />

      <div className="absolute top-[6vh] left-[6vw] right-[6vw] flex items-center justify-between">
        <div>
          <div className="font-body text-[1.4vw] font-medium tracking-[0.2em] uppercase mb-[0.8vh]" style={{ color: "#00B4D8" }}>Platform Overview</div>
          <h2 className="font-display font-bold tracking-tight" style={{ fontSize: "4vw", color: "#F0F9FF", lineHeight: "1.1" }}>
            Features &amp; Impact
          </h2>
        </div>
        <div className="flex items-center gap-[1vw] px-[1.5vw] py-[1vh] rounded-full" style={{ background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.25)" }}>
          <div className="w-[1.2vw] h-[1.2vw] rounded-full" style={{ background: "#00B4D8" }} />
          <span className="font-body text-[1.4vw] font-medium" style={{ color: "#7DD3FC" }}>SDG 6 Aligned</span>
        </div>
      </div>

      <div className="absolute left-[6vw] right-[6vw]" style={{ top: "23vh" }}>
        <div className="grid grid-cols-4 gap-[2vw]">

          <div className="rounded-[1.2vw] p-[2vw]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,180,216,0.2)" }}>
            <div className="w-[4vw] h-[4vw] rounded-[1vw] flex items-center justify-center mb-[2vh]" style={{ background: "rgba(0,180,216,0.15)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-[2.2vw] h-[2.2vw]" stroke="#00B4D8" strokeWidth="1.8">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <div className="font-display font-semibold text-[1.8vw] mb-[1vh]" style={{ color: "#F0F9FF" }}>Complaint Reporting</div>
            <div className="font-body text-[1.5vw] leading-relaxed" style={{ color: "#94A3B8" }}>Citizens file geotagged water quality complaints with photo evidence and severity classification</div>
          </div>

          <div className="rounded-[1.2vw] p-[2vw]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,180,216,0.2)" }}>
            <div className="w-[4vw] h-[4vw] rounded-[1vw] flex items-center justify-center mb-[2vh]" style={{ background: "rgba(0,180,216,0.15)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-[2.2vw] h-[2.2vw]" stroke="#00B4D8" strokeWidth="1.8">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="font-display font-semibold text-[1.8vw] mb-[1vh]" style={{ color: "#F0F9FF" }}>Live Map View</div>
            <div className="font-body text-[1.5vw] leading-relaxed" style={{ color: "#94A3B8" }}>Interactive map showing area-wise water quality scores and active complaint clusters across cities</div>
          </div>

          <div className="rounded-[1.2vw] p-[2vw]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,180,216,0.2)" }}>
            <div className="w-[4vw] h-[4vw] rounded-[1vw] flex items-center justify-center mb-[2vh]" style={{ background: "rgba(0,180,216,0.15)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-[2.2vw] h-[2.2vw]" stroke="#00B4D8" strokeWidth="1.8">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
            </div>
            <div className="font-display font-semibold text-[1.8vw] mb-[1vh]" style={{ color: "#F0F9FF" }}>Community Alerts</div>
            <div className="font-body text-[1.5vw] leading-relaxed" style={{ color: "#94A3B8" }}>Real-time water quality alerts and boil advisories broadcast to citizens by area authorities</div>
          </div>

          <div className="rounded-[1.2vw] p-[2vw]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,180,216,0.2)" }}>
            <div className="w-[4vw] h-[4vw] rounded-[1vw] flex items-center justify-center mb-[2vh]" style={{ background: "rgba(0,180,216,0.15)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-[2.2vw] h-[2.2vw]" stroke="#00B4D8" strokeWidth="1.8">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div className="font-display font-semibold text-[1.8vw] mb-[1vh]" style={{ color: "#F0F9FF" }}>Admin Analytics</div>
            <div className="font-body text-[1.5vw] leading-relaxed" style={{ color: "#94A3B8" }}>Government dashboard tracking resolution rates, area risk levels, and SDG 6 progress metrics</div>
          </div>
        </div>
      </div>

      <div className="absolute left-[6vw] right-[6vw]" style={{ bottom: "6vh" }}>
        <div className="flex gap-[2vw]">

          <div className="flex-1 rounded-[1.2vw] p-[2vw] flex items-center gap-[2vw]" style={{ background: "rgba(0,180,216,0.08)", border: "1px solid rgba(0,180,216,0.3)" }}>
            <div>
              <div className="font-display font-bold text-[3.5vw]" style={{ color: "#00B4D8" }}>JWT</div>
              <div className="font-body text-[1.4vw]" style={{ color: "#94A3B8" }}>Secure Auth</div>
            </div>
            <div className="w-[1px] self-stretch" style={{ background: "rgba(0,180,216,0.2)" }} />
            <div className="font-body text-[1.5vw]" style={{ color: "#BAE6FD" }}>
              Role-based access for citizens and administrators with full audit history
            </div>
          </div>

          <div className="flex-1 rounded-[1.2vw] p-[2vw] flex items-center gap-[2vw]" style={{ background: "rgba(0,180,216,0.08)", border: "1px solid rgba(0,180,216,0.3)" }}>
            <div>
              <div className="font-display font-bold text-[3.5vw]" style={{ color: "#00B4D8" }}>Open</div>
              <div className="font-body text-[1.4vw]" style={{ color: "#94A3B8" }}>API</div>
            </div>
            <div className="w-[1px] self-stretch" style={{ background: "rgba(0,180,216,0.2)" }} />
            <div className="font-body text-[1.5vw]" style={{ color: "#BAE6FD" }}>
              40+ REST endpoints with OpenAPI spec, full codegen, and PostgreSQL backend
            </div>
          </div>

          <div className="flex-1 rounded-[1.2vw] p-[2vw] flex items-center gap-[2vw]" style={{ background: "rgba(0,180,216,0.08)", border: "1px solid rgba(0,180,216,0.3)" }}>
            <div>
              <div className="font-display font-bold text-[3.5vw]" style={{ color: "#00B4D8" }}>Free</div>
              <div className="font-body text-[1.4vw]" style={{ color: "#94A3B8" }}>For Citizens</div>
            </div>
            <div className="w-[1px] self-stretch" style={{ background: "rgba(0,180,216,0.2)" }} />
            <div className="font-body text-[1.5vw]" style={{ color: "#BAE6FD" }}>
              No barriers to filing complaints — every citizen gets voice and tracking transparency
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
