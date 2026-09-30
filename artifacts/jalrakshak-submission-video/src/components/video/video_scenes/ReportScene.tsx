import { motion } from 'framer-motion';

import { palette, SceneTag } from './ScenePrimitives';

export function ReportScene() {
  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.38 }}
      style={{ background: 'linear-gradient(118deg, #071421 0%, #0C1A2E 61%, #0C3549 100%)' }}
    >
      <div className="absolute right-[-7%] top-[-8%] h-[112%] w-[55%] opacity-70">
        <svg viewBox="0 0 680 900" className="h-full w-full" aria-hidden="true">
          <g fill="none" stroke="rgba(125,211,252,.22)" strokeWidth="2">
            <path d="M70 32V870M170 32V870M270 32V870M370 32V870M470 32V870M570 32V870" />
            <path d="M15 110H660M15 220H660M15 330H660M15 440H660M15 550H660M15 660H660M15 770H660" />
            <path d="M70 330L170 220L270 330L370 220L470 330L570 220M70 660L170 550L270 660L370 550L470 660L570 550" />
          </g>
          <path d="M370 220C430 290 410 370 480 440S530 585 570 660" fill="none" stroke={palette.cyan} strokeWidth="5" strokeDasharray="9 13" />
          <circle cx="480" cy="440" r="15" fill={palette.cyan} />
        </svg>
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(7,20,33,.96) 0%, rgba(7,20,33,.55) 62%, rgba(7,20,33,.08) 100%)' }} />

      <div className="absolute left-[7%] top-[8%] z-10">
        <SceneTag>CITIZEN REPORTING</SceneTag>
      </div>

      <motion.div
        className="absolute left-[8%] top-[17%] z-10 w-[42%] rounded-[2.1vmin] border p-[2.5vmin]"
        initial={{ opacity: 0, y: 35, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.14, duration: 0.72, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ background: 'linear-gradient(145deg, rgba(14,39,60,.97), rgba(9,27,43,.96))', borderColor: 'rgba(0,180,216,.42)', boxShadow: '0 2.8vmin 8vmin rgba(0,0,0,.32)' }}
      >
        <div className="mb-[2.2vh] flex items-center justify-between border-b pb-[1.9vh]" style={{ borderColor: 'rgba(186,230,253,.16)' }}>
          <div className="font-display font-semibold" style={{ color: palette.white, fontSize: '3.2vmin' }}>Report a water issue</div>
          <div className="flex h-[4.6vmin] w-[4.6vmin] items-center justify-center rounded-full" style={{ background: 'rgba(0,180,216,.15)', color: palette.cyan, fontSize: '2.3vmin' }}>01</div>
        </div>

        <div className="mb-[1.5vh] rounded-[1.1vmin] border px-[1.7vmin] py-[1.1vmin]" style={{ background: 'rgba(255,255,255,.035)', borderColor: 'rgba(186,230,253,.14)' }}>
          <div style={{ color: palette.muted, fontSize: '1.8vmin', letterSpacing: '.09em', textTransform: 'uppercase' }}>Location</div>
          <div className="mt-[.45vh] flex items-center gap-[1vmin]" style={{ color: '#E4F7FF', fontSize: '2.15vmin' }}>
            <span className="inline-block h-[1.25vmin] w-[1.25vmin] rounded-full" style={{ background: palette.cyan, boxShadow: '0 0 1.1vmin #00B4D899' }} />
            Pin this area on the map
          </div>
        </div>
        <div className="mb-[1.5vh] grid grid-cols-[1fr_1.35fr] gap-[1.3vmin]">
          <div className="flex min-h-[12vh] flex-col items-center justify-center rounded-[1.1vmin] border border-dashed" style={{ borderColor: 'rgba(0,180,216,.45)', background: 'rgba(0,180,216,.06)', color: palette.ice }}>
            <span style={{ fontSize: '3.4vmin', lineHeight: 1 }}>＋</span>
            <span className="mt-[.7vh]" style={{ fontSize: '1.9vmin' }}>Add a photo</span>
          </div>
          <div className="rounded-[1.1vmin] border px-[1.7vmin] py-[1.1vmin]" style={{ borderColor: 'rgba(186,230,253,.14)', background: 'rgba(255,255,255,.035)' }}>
            <div style={{ color: palette.muted, fontSize: '1.8vmin', letterSpacing: '.09em', textTransform: 'uppercase' }}>Describe the issue</div>
            <div className="mt-[1vh] h-[1px] w-[90%]" style={{ background: 'rgba(186,230,253,.28)' }} />
            <div className="mt-[1.2vh] h-[1px] w-[65%]" style={{ background: 'rgba(186,230,253,.16)' }} />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-[1.1vmin] px-[1.6vmin] py-[1.1vmin]" style={{ background: 'rgba(0,180,216,.1)', border: '1px solid rgba(0,180,216,.24)' }}>
          <span style={{ color: palette.ice, fontSize: '1.9vmin' }}>Severity</span>
          <span className="flex gap-[1.1vmin]" style={{ color: '#C7E8F3', fontSize: '1.75vmin' }}><span>Low</span><span>Medium</span><span>High</span></span>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-[12%] right-[8%] z-10 max-w-[42%]" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 4.35, duration: 0.5 }}>
        <p className="font-display font-semibold leading-tight" style={{ color: palette.white, fontSize: '4.1vmin' }}>A clearer signal<br />for the right area.</p>
        <p className="mt-[2.2vh] font-body" style={{ color: palette.ice, fontSize: '2.2vmin', letterSpacing: '.05em' }}>REPORT · EVIDENCE · LOCATION · TRACKING</p>
      </motion.div>

      <motion.div className="absolute right-[9%] top-[47%] z-10 h-[1.6vmin] w-[1.6vmin] rounded-full" initial={{ scale: 0 }} animate={{ scale: [0, 1.15, 1] }} transition={{ delay: 1.05, duration: 0.5 }} style={{ background: palette.cyan, boxShadow: '0 0 2vmin #00B4D899' }} />
      <motion.div className="absolute bottom-[0] left-[8%] h-[.45vh] bg-cyan-300" initial={{ width: '0%' }} animate={{ width: ['0%', '33%', '59%', '92%'] }} transition={{ duration: 8.5, delay: 0.3, ease: 'linear' }} />
    </motion.section>
  );
}
