import { motion } from 'framer-motion';

import { MovingDot, palette, RouteLine, SceneTag } from './ScenePrimitives';

export function ResponseScene() {
  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.38 }}
      style={{ background: 'radial-gradient(ellipse at 50% 60%, #123651 0%, #0C1A2E 52%, #071421 100%)' }}
    >
      <div className="absolute inset-0 opacity-25">
        <svg viewBox="0 0 1440 900" className="h-full w-full" aria-hidden="true">
          <g fill="none" stroke="#7DD3FC" strokeWidth="1">
            <path d="M0 150H1440M0 260H1440M0 370H1440M0 480H1440M0 590H1440M0 700H1440M0 810H1440" />
            <path d="M100 0V900M220 0V900M340 0V900M460 0V900M580 0V900M700 0V900M820 0V900M940 0V900M1060 0V900M1180 0V900M1300 0V900" />
            <path d="M0 260L100 150L220 260L340 150L460 260L580 150L700 260L820 150L940 260L1060 150L1180 260L1300 150L1440 260M0 700L100 590L220 700L340 590L460 700L580 590L700 700L820 590L940 700L1060 590L1180 700L1300 590L1440 700" />
          </g>
        </svg>
      </div>
      <div className="absolute left-[7%] top-[8%]">
        <SceneTag>THE CIVIC RESPONSE LOOP</SceneTag>
        <motion.h2 className="mt-[1.8vh] font-display font-bold tracking-[-0.045em]" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.48 }} style={{ color: palette.white, fontSize: '6.6vmin' }}>
          FROM REPORT TO RESPONSE
        </motion.h2>
      </div>

      <div className="absolute left-[8%] right-[8%] top-[34%] h-[38%]">
        <RouteLine />
        <motion.div className="absolute left-[1%] top-[70%]" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.35, duration: 0.55, type: 'spring', stiffness: 240, damping: 20 }}>
          <div className="flex h-[8vmin] w-[8vmin] items-center justify-center rounded-full border-2" style={{ borderColor: palette.cyan, background: '#0C1A2E', boxShadow: '0 0 3vmin #00B4D833' }}><MovingDot /></div>
        </motion.div>
        <motion.div className="absolute left-[29%] top-[24%]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.35, duration: 0.48, type: 'spring', stiffness: 240, damping: 19 }}>
          <div className="flex h-[8vmin] w-[8vmin] items-center justify-center rounded-full border-2" style={{ borderColor: palette.cyan, background: '#0C1A2E', boxShadow: '0 0 3vmin #00B4D833' }}><span style={{ color: palette.cyan, fontSize: '3.3vmin' }}>▦</span></div>
        </motion.div>
        <motion.div className="absolute left-[57%] top-[70%]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.55, duration: 0.48, type: 'spring', stiffness: 240, damping: 19 }}>
          <div className="flex h-[8vmin] w-[8vmin] items-center justify-center rounded-full border-2" style={{ borderColor: palette.cyan, background: '#0C1A2E', boxShadow: '0 0 3vmin #00B4D833' }}><span style={{ color: palette.cyan, fontSize: '3.3vmin' }}>✓</span></div>
        </motion.div>
        <motion.div className="absolute right-[0] top-[24%]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3.7, duration: 0.48, type: 'spring', stiffness: 240, damping: 19 }}>
          <div className="flex h-[8vmin] w-[8vmin] items-center justify-center rounded-full border-2" style={{ borderColor: palette.cyan, background: '#0C1A2E', boxShadow: '0 0 3vmin #00B4D833' }}><span style={{ color: palette.cyan, fontSize: '3.3vmin' }}>↻</span></div>
        </motion.div>

        <motion.div className="absolute left-0 top-[102%] w-[22%] text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.38 }} style={{ color: '#D8F3FB', fontSize: '2.05vmin', fontWeight: 600 }}>Citizen report</motion.div>
        <motion.div className="absolute left-[23%] top-[-8%] w-[22%] text-center" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.38 }} style={{ color: '#D8F3FB', fontSize: '2.05vmin', fontWeight: 600 }}>Area dashboard</motion.div>
        <motion.div className="absolute left-[48%] top-[102%] w-[22%] text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.9, duration: 0.38 }} style={{ color: '#D8F3FB', fontSize: '2.05vmin', fontWeight: 600 }}>Authority review</motion.div>
        <motion.div className="absolute right-[-3%] top-[-8%] w-[22%] text-center" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4, duration: 0.38 }} style={{ color: '#D8F3FB', fontSize: '2.05vmin', fontWeight: 600 }}>Status update</motion.div>
      </div>

      <motion.p className="absolute bottom-[9%] left-[8%] max-w-[70%] font-display font-medium" initial={{ opacity: 0, y: 13 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 5.8, duration: 0.5 }} style={{ color: '#B9DDEB', fontSize: '3vmin' }}>
        A transparent loop—not a one-way complaint.
      </motion.p>
      <motion.div className="absolute left-[8%] top-[49%] h-[1.1vmin] w-[1.1vmin] rounded-full" animate={{ x: ['0vw', '72vw'], opacity: [0.3, 1, 0.3] }} transition={{ duration: 4.8, delay: 5.7, repeat: Infinity, ease: 'linear' }} style={{ background: '#D9F8FF', boxShadow: '0 0 2vmin #00B4D8' }} />
      <motion.div className="absolute bottom-[0] right-[-4%] h-[48vmin] w-[48vmin] rounded-full border border-cyan-200/50" animate={{ rotate: [0, 25], scale: [0.78, 1.3], opacity: [0.8, 0] }} transition={{ duration: 1.4, delay: 9.7, ease: 'easeIn' }} />
    </motion.section>
  );
}
