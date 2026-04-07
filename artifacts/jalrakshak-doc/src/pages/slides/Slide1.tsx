const base = import.meta.env.BASE_URL;

export default function Slide1() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "linear-gradient(135deg, #0C1A2E 0%, #0F2B45 50%, #0A2233 100%)" }}>

      <img
        src={`${base}hero.png`}
        crossOrigin="anonymous"
        alt="Water quality infrastructure"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.18 }}
      />

      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,26,46,0.3) 0%, rgba(12,26,46,0.75) 60%, rgba(12,26,46,0.95) 100%)" }} />

      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,180,216,0.12) 0%, transparent 70%)", transform: "translate(20%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%)", transform: "translate(-20%, 30%)" }} />

      <div className="absolute top-[6vh] left-[6vw] flex items-center gap-[1.2vw]">
        <div className="w-[3.5vw] h-[3.5vw] rounded-[0.8vw] flex items-center justify-center" style={{ background: "rgba(0,180,216,0.2)", border: "1px solid rgba(0,180,216,0.4)" }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-[2vw] h-[2vw]" stroke="#00B4D8" strokeWidth="2">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <span className="font-display text-[1.6vw] font-semibold tracking-wide" style={{ color: "#00B4D8" }}>JalRakshak</span>
      </div>

      <div className="absolute top-[6vh] right-[6vw]">
        <span className="font-body text-[1.4vw] font-medium px-[1.2vw] py-[0.6vh] rounded-full" style={{ background: "rgba(0,180,216,0.15)", border: "1px solid rgba(0,180,216,0.3)", color: "#7DD3FC" }}>
          Government Civic Platform
        </span>
      </div>

      <div className="absolute left-[6vw] top-[50%]" style={{ transform: "translateY(-52%)" }}>
        <div className="mb-[2vh]">
          <span className="font-body text-[1.5vw] font-medium tracking-[0.25em] uppercase" style={{ color: "#00B4D8" }}>
            India's Water Quality Initiative
          </span>
        </div>

        <h1 className="font-display font-extrabold leading-none tracking-tight mb-[3vh]" style={{ fontSize: "9vw", color: "#F0F9FF", lineHeight: "0.95" }}>
          Jal
          <span style={{ color: "#00B4D8" }}>Rakshak</span>
        </h1>

        <p className="font-body text-[2vw] font-light leading-relaxed mb-[5vh]" style={{ color: "#BAE6FD", maxWidth: "42vw", lineHeight: "1.5" }}>
          Civic-tech platform for monitoring water quality and resolving public water supply issues — transparently.
        </p>

        <div className="h-[0.3vh] w-[12vw]" style={{ background: "linear-gradient(90deg, #00B4D8, transparent)" }} />
      </div>

      <div className="absolute bottom-[6vh] left-[6vw] right-[6vw] flex items-end justify-between">
        <div className="flex gap-[4vw]">
          <div>
            <div className="font-display font-bold text-[3.5vw]" style={{ color: "#F0F9FF" }}>10+</div>
            <div className="font-body text-[1.4vw]" style={{ color: "#94A3B8" }}>Active Areas</div>
          </div>
          <div className="w-[1px]" style={{ background: "rgba(148,163,184,0.2)", alignSelf: "stretch" }} />
          <div>
            <div className="font-display font-bold text-[3.5vw]" style={{ color: "#F0F9FF" }}>SDG 6</div>
            <div className="font-body text-[1.4vw]" style={{ color: "#94A3B8" }}>UN Goal Aligned</div>
          </div>
          <div className="w-[1px]" style={{ background: "rgba(148,163,184,0.2)", alignSelf: "stretch" }} />
          <div>
            <div className="font-display font-bold text-[3.5vw]" style={{ color: "#F0F9FF" }}>Real-time</div>
            <div className="font-body text-[1.4vw]" style={{ color: "#94A3B8" }}>Quality Alerts</div>
          </div>
        </div>

        <div className="font-body text-[1.4vw]" style={{ color: "#475569" }}>
          April 2026
        </div>
      </div>

      <div className="absolute right-[6vw] top-[50%]" style={{ transform: "translateY(-50%)" }}>
        <div className="w-[32vw] h-[38vh] rounded-[2vw] flex flex-col justify-center items-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,180,216,0.2)", backdropFilter: "blur(12px)" }}>
          <div className="w-[8vw] h-[8vw] rounded-full mb-[2vh] flex items-center justify-center" style={{ background: "rgba(0,180,216,0.15)", border: "2px solid rgba(0,180,216,0.4)" }}>
            <svg viewBox="0 0 48 48" fill="none" className="w-[5vw] h-[5vw]">
              <path d="M24 4C24 4 8 18 8 28C8 36.837 15.163 44 24 44C32.837 44 40 36.837 40 28C40 18 24 4 24 4Z" fill="rgba(0,180,216,0.3)" stroke="#00B4D8" strokeWidth="2"/>
              <path d="M16 30C16 30 18 26 24 26C30 26 32 30 32 30" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="font-display font-semibold text-[1.8vw] mb-[1vh] text-center" style={{ color: "#F0F9FF" }}>Clean Water for All</div>
          <div className="font-body text-[1.4vw] text-center px-[2vw]" style={{ color: "#94A3B8", lineHeight: "1.5" }}>Transparent civic reporting for every Indian citizen</div>
        </div>
      </div>
    </div>
  );
}
