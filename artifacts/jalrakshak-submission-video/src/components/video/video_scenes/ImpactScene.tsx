import { motion } from 'framer-motion';

import { palette, WaterMark } from './ScenePrimitives';

export function ImpactScene() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ background: 'radial-gradient(ellipse at 50% 42%, #F7FFFF 0%, #DDF7F7 52%, #BCEBED 100%)' }}>
      <motion.div className="absolute left-1/2 top-[45%] h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border" initial={{ scale: 0.2, opacity: 0 }} animate={{ scale: [0.2, 1, 1.1], opacity: [0, 0.7, 0.35] }} transition={{ duration: 1.1, ease: 'easeOut' }} style={{ borderColor: 'rgba(0,164,191,.65)' }} />
      <motion.div className="absolute left-1/2 top-[45%] h-[44vmin] w-[44vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: [0.4, 1, 1.08], opacity: [0, 0.62, 0.28] }} transition={{ delay: 0.18, duration: 1.1, ease: 'easeOut' }} style={{ borderColor: 'rgba(0,164,191,.55)' }} />
      <motion.h2 className="absolute left-1/2 top-[8%] -translate-x-1/2 font-display font-semibold tracking-[-0.03em]" initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.45 }} style={{ color: palette.navy, fontSize: '4.8vmin', whiteSpace: 'nowrap' }}>
        Measure what changes.
      </motion.h2>

      <motion.div className="absolute left-[10%] top-[30%] rounded-full border px-[1.6vmin] py-[1vmin]" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.95, duration: 0.42 }} style={{ borderColor: 'rgba(22,138,162,.35)', background: 'rgba(255,255,255,.58)', color: '#245A6A', fontSize: '2vmin' }}>Time to acknowledge</motion.div>
      <motion.div className="absolute right-[10%] top-[30%] rounded-full border px-[1.6vmin] py-[1vmin]" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.95, duration: 0.42 }} style={{ borderColor: 'rgba(22,138,162,.35)', background: 'rgba(255,255,255,.58)', color: '#245A6A', fontSize: '2vmin' }}>Issues resolved</motion.div>
      <motion.div className="absolute bottom-[30%] left-[8%] rounded-full border px-[1.6vmin] py-[1vmin]" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.95, duration: 0.42 }} style={{ borderColor: 'rgba(22,138,162,.35)', background: 'rgba(255,255,255,.58)', color: '#245A6A', fontSize: '2vmin' }}>Repeat reports by area</motion.div>
      <motion.div className="absolute bottom-[30%] right-[8%] rounded-full border px-[1.6vmin] py-[1vmin]" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.95, duration: 0.42 }} style={{ borderColor: 'rgba(22,138,162,.35)', background: 'rgba(255,255,255,.58)', color: '#245A6A', fontSize: '2vmin' }}>Status visibility</motion.div>

      <motion.p className="absolute left-1/2 top-[72%] -translate-x-1/2 font-display font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5, duration: 0.55 }} style={{ color: '#28657B', fontSize: '2.85vmin', whiteSpace: 'nowrap' }}>
        Earlier signals. Clearer follow-through.
      </motion.p>

      <motion.div className="absolute left-1/2 top-[45%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" initial={{ opacity: 0, scale: 0.78 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 7.75, duration: 0.55, type: 'spring', stiffness: 210, damping: 20 }}>
        <WaterMark size="7vmin" color="#058FA9" />
        <div className="mt-[1.2vh] font-display font-extrabold tracking-[-0.05em]" style={{ color: palette.navy, fontSize: '7.4vmin' }}>JalRakshak</div>
        <div className="mt-[1.2vh] font-body font-semibold" style={{ color: '#16708A', fontSize: '2.1vmin', letterSpacing: '.07em' }}>SDG 6 · CLEAN WATER AND SANITATION</div>
      </motion.div>

      <motion.div className="absolute left-1/2 top-[87%] -translate-x-1/2 font-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 8.5, duration: 0.4 }} style={{ color: '#28657B', fontSize: '2vmin', whiteSpace: 'nowrap' }}>
        A civic loop for every water concern.
      </motion.div>
      <motion.div className="absolute left-1/2 top-[44%] h-[1.5vmin] w-[1.5vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 0.65], opacity: [0, 1, 0] }} transition={{ delay: 9.7, duration: 0.28, ease: 'easeIn' }} style={{ background: '#058FA9', boxShadow: '0 0 2vmin #00B4D8' }} />
    </motion.section>
  );
}
