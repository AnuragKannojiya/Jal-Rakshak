import { motion } from 'framer-motion';

import { MovingDot, palette, SceneTag } from './ScenePrimitives';

const base = import.meta.env.BASE_URL;

export function SignalScene() {
  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.38 }}
      style={{ background: 'linear-gradient(120deg, #071421 0%, #0C1A2E 54%, #0A3045 100%)' }}
    >
      <motion.img
        src={`${base}images/water-grid.png`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.16, opacity: 0.06 }}
        animate={{ scale: [1.16, 1.08, 1.03], opacity: [0.06, 0.2, 0.28] }}
        transition={{ duration: 8.3, ease: 'easeOut' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(7,20,33,.98) 0%, rgba(7,20,33,.82) 46%, rgba(7,20,33,.2) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 73% 52%, rgba(0,180,216,.14), transparent 39%)' }} />

      <div className="absolute left-[7%] top-[19%] z-10 max-w-[51%]">
        <SceneTag>India’s water quality initiative</SceneTag>
        <motion.h1
          className="mt-[2.7vh] font-display font-extrabold tracking-[-0.055em]"
          initial={{ opacity: 0, x: -36, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ color: palette.white, fontSize: '8.2vmin', lineHeight: 0.98 }}
        >
          WATER ISSUES
          <br />
          <span style={{ color: palette.cyan }}>ARE LOCAL.</span>
        </motion.h1>
        <motion.p
          className="mt-[3.4vh] font-body font-medium"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.45, duration: 0.45 }}
          style={{ color: '#D9F3FC', fontSize: '4.2vmin', lineHeight: 1.06, maxWidth: '46vmin' }}
        >
          THE SIGNAL
          <br />
          SHOULDN’T BE.
        </motion.p>
        <motion.div
          className="mt-[3.1vh]"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 5.05, duration: 0.45 }}
          style={{ color: palette.ice, fontSize: '2.8vmin', fontWeight: 500 }}
        >
          Make every concern visible.
        </motion.div>
      </div>

      <div className="absolute right-[8%] top-[18%] h-[66%] w-[35%]">
        <svg viewBox="0 0 560 560" className="h-full w-full" aria-hidden="true">
          <g fill="none" stroke="rgba(125,211,252,.27)" strokeWidth="1">
            <path d="M34 132H526M34 214H526M34 296H526M34 378H526M34 460H526" />
            <path d="M112 34V526M194 34V526M276 34V526M358 34V526M440 34V526" />
            <path d="M34 132L112 214L194 132L276 214L358 132L440 214L526 132M34 378L112 296L194 378L276 296L358 378L440 296L526 378" />
          </g>
          <motion.circle cx="278" cy="280" r="52" fill="rgba(0,180,216,.12)" stroke={palette.cyan} strokeWidth="2" animate={{ r: [52, 68, 52], opacity: [0.8, 0.45, 0.8] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.circle cx="278" cy="280" r="104" fill="none" stroke="rgba(0,180,216,.6)" strokeWidth="2" animate={{ r: [98, 154], opacity: [0.7, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }} />
          <motion.circle cx="278" cy="280" r="168" fill="none" stroke="rgba(0,180,216,.35)" strokeWidth="1.5" animate={{ r: [158, 232], opacity: [0.48, 0] }} transition={{ duration: 3.1, repeat: Infinity, ease: 'easeOut', delay: 0.72 }} />
          <path d="M278 239C257 266 246 279 246 296a32 32 0 0064 0c0-17-11-30-32-57Z" fill="rgba(0,180,216,.75)" stroke="#B9F0FF" strokeWidth="3" />
          <circle cx="278" cy="295" r="7" fill="#F0F9FF" />
        </svg>
      </div>

      <motion.div className="absolute bottom-[8%] left-[7%] flex items-center gap-[1.2vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6 }}>
        <MovingDot />
        <span className="font-mono" style={{ color: 'rgba(186,230,253,.76)', fontSize: '1.8vmin', letterSpacing: '0.14em' }}>JALRAKSHAK · CIVIC WATER QUALITY</span>
      </motion.div>
      <motion.div className="absolute bottom-[-17%] right-[8%] h-[50vmin] w-[50vmin] rounded-full border border-cyan-300/40" animate={{ scale: [0.5, 1.65], opacity: [0.68, 0] }} transition={{ duration: 1.35, delay: 7.7, ease: 'easeIn' }} />
    </motion.section>
  );
}
