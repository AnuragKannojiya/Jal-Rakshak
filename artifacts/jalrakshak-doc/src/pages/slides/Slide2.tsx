export default function Slide2() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "linear-gradient(140deg, #0C1A2E 0%, #0F2B45 58%, #091422 100%)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 72% 60% at 50% 0%, rgba(0,180,216,0.08) 0%, transparent 72%)" }} />
      <div className="absolute top-0 left-0 w-full h-[0.4vh]" style={{ background: "linear-gradient(90deg, transparent, #00B4D8, transparent)" }} />

      <div className="absolute top-[7vh] left-[6vw] right-[6vw]">
        <div className="font-body text-[1.5vw] font-semibold tracking-[0.2em] uppercase" style={{ color: "#00B4D8" }}>The challenge</div>
        <h2 className="mt-[1.2vh] font-display text-[4.2vw] font-bold tracking-tight" style={{ color: "#F0F9FF", lineHeight: 1.05 }}>Local water concerns</h2>
        <p className="mt-[1.4vh] font-body text-[2vw]" style={{ color: "#94A3B8" }}>A practical response starts with a clear, shared signal.</p>
      </div>

      <div className="absolute left-[6vw] right-[6vw] top-[31vh] grid grid-cols-3 gap-[2vw]">
        <div className="rounded-[1.2vw] p-[2.2vw]" style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(0,180,216,0.22)" }}>
          <div className="mb-[2.4vh] flex h-[4.2vw] w-[4.2vw] items-center justify-center rounded-full" style={{ background: "rgba(0,180,216,0.14)", border: "1px solid rgba(0,180,216,0.35)" }}>
            <svg viewBox="0 0 32 32" className="h-[2.2vw] w-[2.2vw]" fill="none" stroke="#7DD3FC" strokeWidth="2">
              <circle cx="16" cy="16" r="4" /><circle cx="16" cy="16" r="10" opacity=".65" /><circle cx="16" cy="16" r="15" opacity=".35" />
            </svg>
          </div>
          <div className="font-display text-[2.3vw] font-semibold" style={{ color: "#F0F9FF" }}>Signals are scattered</div>
          <p className="mt-[1.6vh] font-body text-[2vw] leading-[1.4]" style={{ color: "#A8BBC9" }}>Reports need location and evidence to help teams see where attention is needed.</p>
        </div>

        <div className="rounded-[1.2vw] p-[2.2vw]" style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(0,180,216,0.22)" }}>
          <div className="mb-[2.4vh] flex h-[4.2vw] w-[4.2vw] items-center justify-center rounded-full" style={{ background: "rgba(0,180,216,0.14)", border: "1px solid rgba(0,180,216,0.35)" }}>
            <svg viewBox="0 0 32 32" className="h-[2.2vw] w-[2.2vw]" fill="none" stroke="#7DD3FC" strokeWidth="2">
              <path d="M5 24h22M7 21l6-6 5 3 7-10" strokeLinecap="round" strokeLinejoin="round" /><circle cx="25" cy="8" r="2" fill="#7DD3FC" />
            </svg>
          </div>
          <div className="font-display text-[2.3vw] font-semibold" style={{ color: "#F0F9FF" }}>Area patterns are hard to see</div>
          <p className="mt-[1.6vh] font-body text-[2vw] leading-[1.4]" style={{ color: "#A8BBC9" }}>A shared area view can help turn individual concerns into a clearer local picture.</p>
        </div>

        <div className="rounded-[1.2vw] p-[2.2vw]" style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(0,180,216,0.22)" }}>
          <div className="mb-[2.4vh] flex h-[4.2vw] w-[4.2vw] items-center justify-center rounded-full" style={{ background: "rgba(0,180,216,0.14)", border: "1px solid rgba(0,180,216,0.35)" }}>
            <svg viewBox="0 0 32 32" className="h-[2.2vw] w-[2.2vw]" fill="none" stroke="#7DD3FC" strokeWidth="2">
              <path d="M5 16h19M18 9l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="6" cy="16" r="2" fill="#7DD3FC" />
            </svg>
          </div>
          <div className="font-display text-[2.3vw] font-semibold" style={{ color: "#F0F9FF" }}>Follow-through needs a path</div>
          <p className="mt-[1.6vh] font-body text-[2vw] leading-[1.4]" style={{ color: "#A8BBC9" }}>Residents and local teams need a visible route from report to status update.</p>
        </div>
      </div>

      <div className="absolute bottom-[8vh] left-[6vw] right-[6vw] flex items-center justify-between rounded-[1vw] px-[2vw] py-[2.2vh]" style={{ background: "rgba(0,180,216,0.09)", border: "1px solid rgba(0,180,216,0.26)" }}>
        <div className="font-display text-[2.3vw] font-semibold" style={{ color: "#BAE6FD" }}>Design goal</div>
        <div className="font-body text-[2vw]" style={{ color: "#F0F9FF" }}>One traceable path: citizen signal → local context → accountable response</div>
      </div>
    </div>
  );
}
