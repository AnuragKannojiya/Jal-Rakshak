const base = import.meta.env.BASE_URL;

export default function Slide2() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "linear-gradient(135deg, #0C1A2E 0%, #0F2B45 50%, #0A2233 100%)" }}>

      {/* Same hero image as slide 1 */}
      <img
        src={`${base}hero.png`}
        crossOrigin="anonymous"
        alt="Water quality infrastructure"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.13 }}
      />

      {/* Readability overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,26,46,0.45) 0%, rgba(12,26,46,0.65) 50%, rgba(12,26,46,0.88) 100%)" }} />

      {/* Same radial glow accents as slide 1 */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,180,216,0.10) 0%, transparent 70%)", transform: "translate(20%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,180,216,0.07) 0%, transparent 70%)", transform: "translate(-20%, 30%)" }} />

      {/* Top accent rule */}
      <div className="absolute top-0 left-0 w-full h-[0.4vh]" style={{ background: "linear-gradient(90deg, transparent, #00B4D8, transparent)" }} />

      {/* Header */}
      <div className="absolute top-[5vh] left-[6vw] right-[6vw] flex items-center justify-between">
        <div>
          <div className="font-body font-semibold tracking-[0.22em] uppercase mb-[0.8vh]" style={{ fontSize: "1.3vw", color: "#00B4D8" }}>Platform Overview</div>
          <h2 className="font-display font-bold tracking-tight" style={{ fontSize: "4vw", color: "#F0F9FF", lineHeight: "1.05" }}>
            Features &amp; Impact
          </h2>
        </div>
        <div className="flex items-center gap-[0.8vw] px-[1.5vw] py-[0.8vh] rounded-full" style={{ background: "rgba(0,180,216,0.12)", border: "1px solid rgba(0,180,216,0.3)" }}>
          <div className="w-[1vw] h-[1vw] rounded-full" style={{ background: "#00B4D8" }} />
          <span className="font-body font-semibold" style={{ fontSize: "1.3vw", color: "#7DD3FC" }}>SDG 6 Aligned</span>
        </div>
      </div>

      {/* Feature cards grid */}
      <div className="absolute left-[6vw] right-[6vw]" style={{ top: "24vh" }}>
        <div className="grid grid-cols-4 gap-[1.8vw]">

          <div className="rounded-[1.2vw] p-[2vw]" style={{ background: "rgba(12,26,46,0.6)", border: "1px solid rgba(0,180,216,0.25)", backdropFilter: "blur(8px)" }}>
            <div className="w-[4vw] h-[4vw] rounded-[1vw] flex items-center justify-center mb-[1.5vh]" style={{ background: "rgba(0,180,216,0.18)", border: "1px solid rgba(0,180,216,0.3)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-[2.2vw] h-[2.2vw]" stroke="#00B4D8" strokeWidth="1.8">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <div className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.7vw", color: "#F0F9FF" }}>Complaint Reporting</div>
            <div className="font-body leading-relaxed" style={{ fontSize: "1.35vw", color: "#CBD5E1" }}>Citizens file geotagged water quality complaints with photo evidence and severity classification</div>
          </div>

          <div className="rounded-[1.2vw] p-[2vw]" style={{ background: "rgba(12,26,46,0.6)", border: "1px solid rgba(0,180,216,0.25)", backdropFilter: "blur(8px)" }}>
            <div className="w-[4vw] h-[4vw] rounded-[1vw] flex items-center justify-center mb-[1.5vh]" style={{ background: "rgba(0,180,216,0.18)", border: "1px solid rgba(0,180,216,0.3)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-[2.2vw] h-[2.2vw]" stroke="#00B4D8" strokeWidth="1.8">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.7vw", color: "#F0F9FF" }}>Live Map View</div>
            <div className="font-body leading-relaxed" style={{ fontSize: "1.35vw", color: "#CBD5E1" }}>Interactive map showing area-wise water quality scores and active complaint clusters across cities</div>
          </div>

          <div className="rounded-[1.2vw] p-[2vw]" style={{ background: "rgba(12,26,46,0.6)", border: "1px solid rgba(0,180,216,0.25)", backdropFilter: "blur(8px)" }}>
            <div className="w-[4vw] h-[4vw] rounded-[1vw] flex items-center justify-center mb-[1.5vh]" style={{ background: "rgba(0,180,216,0.18)", border: "1px solid rgba(0,180,216,0.3)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-[2.2vw] h-[2.2vw]" stroke="#00B4D8" strokeWidth="1.8">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
            </div>
            <div className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.7vw", color: "#F0F9FF" }}>Community Alerts</div>
            <div className="font-body leading-relaxed" style={{ fontSize: "1.35vw", color: "#CBD5E1" }}>Real-time water quality alerts and boil advisories broadcast to citizens by area authorities</div>
          </div>

          <div className="rounded-[1.2vw] p-[2vw]" style={{ background: "rgba(12,26,46,0.6)", border: "1px solid rgba(0,180,216,0.25)", backdropFilter: "blur(8px)" }}>
            <div className="w-[4vw] h-[4vw] rounded-[1vw] flex items-center justify-center mb-[1.5vh]" style={{ background: "rgba(0,180,216,0.18)", border: "1px solid rgba(0,180,216,0.3)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-[2.2vw] h-[2.2vw]" stroke="#00B4D8" strokeWidth="1.8">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div className="font-display font-bold mb-[1vh]" style={{ fontSize: "1.7vw", color: "#F0F9FF" }}>Admin Analytics</div>
            <div className="font-body leading-relaxed" style={{ fontSize: "1.35vw", color: "#CBD5E1" }}>Government dashboard tracking resolution rates, area risk levels, and SDG 6 progress metrics</div>
          </div>

        </div>
      </div>

      {/* Bottom technical highlights */}
      <div className="absolute left-[6vw] right-[6vw]" style={{ bottom: "5vh" }}>
        <div className="flex gap-[1.8vw]">

          <div className="flex-1 rounded-[1.2vw] p-[1.8vw] flex items-center gap-[1.8vw]" style={{ background: "rgba(0,180,216,0.10)", border: "1px solid rgba(0,180,216,0.35)", backdropFilter: "blur(8px)" }}>
            <div className="flex-shrink-0">
              <div className="font-display font-extrabold" style={{ fontSize: "3vw", color: "#00B4D8", lineHeight: 1 }}>JWT</div>
              <div className="font-body font-medium mt-[0.4vh]" style={{ fontSize: "1.3vw", color: "#7DD3FC" }}>Secure Auth</div>
            </div>
            <div className="w-[1px] self-stretch" style={{ background: "rgba(0,180,216,0.25)" }} />
            <div className="font-body" style={{ fontSize: "1.4vw", color: "#E2EEF9", lineHeight: 1.5 }}>
              Role-based access for citizens and administrators with full audit history
            </div>
          </div>

          <div className="flex-1 rounded-[1.2vw] p-[1.8vw] flex items-center gap-[1.8vw]" style={{ background: "rgba(0,180,216,0.10)", border: "1px solid rgba(0,180,216,0.35)", backdropFilter: "blur(8px)" }}>
            <div className="flex-shrink-0">
              <div className="font-display font-extrabold" style={{ fontSize: "3vw", color: "#00B4D8", lineHeight: 1 }}>Open</div>
              <div className="font-body font-medium mt-[0.4vh]" style={{ fontSize: "1.3vw", color: "#7DD3FC" }}>API</div>
            </div>
            <div className="w-[1px] self-stretch" style={{ background: "rgba(0,180,216,0.25)" }} />
            <div className="font-body" style={{ fontSize: "1.4vw", color: "#E2EEF9", lineHeight: 1.5 }}>
              40+ REST endpoints with OpenAPI spec, full codegen, and PostgreSQL backend
            </div>
          </div>

          <div className="flex-1 rounded-[1.2vw] p-[1.8vw] flex items-center gap-[1.8vw]" style={{ background: "rgba(0,180,216,0.10)", border: "1px solid rgba(0,180,216,0.35)", backdropFilter: "blur(8px)" }}>
            <div className="flex-shrink-0">
              <div className="font-display font-extrabold" style={{ fontSize: "3vw", color: "#00B4D8", lineHeight: 1 }}>Free</div>
              <div className="font-body font-medium mt-[0.4vh]" style={{ fontSize: "1.3vw", color: "#7DD3FC" }}>For Citizens</div>
            </div>
            <div className="w-[1px] self-stretch" style={{ background: "rgba(0,180,216,0.25)" }} />
            <div className="font-body" style={{ fontSize: "1.4vw", color: "#E2EEF9", lineHeight: 1.5 }}>
              No barriers to filing complaints — every citizen gets voice and tracking transparency
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
