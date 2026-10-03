import { motion } from 'framer-motion';

import { palette, SceneTag } from './ScenePrimitives';

const Stage = ({ number, title, icon, delay }: { number: string; title: string; icon: string; delay: number }) => (
  <div className="relative flex w-[29%] flex-col items-center text-center">
    <motion.div
      className="relative z-10 flex h-[18vmin] w-[18vmin] items-center justify-center rounded-full border-[.45vmin]"
      initial={{ scale: 0.55, opacity: 0 }}
      animate={{ scale: [0.55, 1.08, 1], opacity: 1 }}
      transition={{ delay, duration: 0.72, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ borderColor: '#00A4BF', background: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #CBF1F2 68%, #A3E3E8 100%)', boxShadow: '0 1.7vmin 4vmin rgba(14,87,111,.15)' }}
    >
      <span className="font-display font-bold" style={{ position: 'absolute', top: '14%', left: '18%', color: '#168AA2', fontSize: '2vmin', letterSpacing: '.08em' }}>{number}</span>
      <span className="font-display font-semibold" style={{ color: '#0C4960', fontSize: '6vmin' }}>{icon}</span>
    </motion.div>
    <motion.p className="mt-[2.5vh] max-w-[90%] font-display font-semibold leading-tight" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay + 0.28, duration: 0.45 }} style={{ color: palette.ink, fontSize: '2.55vmin' }}>{title}</motion.p>
  </div>
);

export function RolloutScene() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ background: 'linear-gradient(135deg, #F0FAF9 0%, #DDF3F2 48%, #C9EBED 100%)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 82% 10%, rgba(255,255,255,.88), transparent 40%)' }} />
      <div className="absolute left-[8%] top-[10%]">
        <SceneTag light>IMPLEMENTATION STRATEGY</SceneTag>
        <motion.h2 className="mt-[1.8vh] font-display font-bold tracking-[-0.045em]" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} style={{ color: palette.navy, fontSize: '6.4vmin' }}>
          START LOCAL. BUILD THE LOOP.
        </motion.h2>
      </div>

      <div className="absolute left-[9%] right-[9%] top-[36%] flex items-start justify-between">
        <motion.div className="absolute left-[7%] right-[7%] top-[8.8vmin] h-[.55vmin] origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.55, duration: 2.2, ease: 'easeInOut' }} style={{ background: 'linear-gradient(90deg, #168AA2, #00B4D8 50%, #168AA2)' }} />
        <Stage number="01" title="Pilot one service area" icon="⌖" delay={0.85} />
        <Stage number="02" title="Connect citizens and local teams" icon="↔" delay={3.45} />
        <Stage number="03" title="Review results; improve the workflow" icon="↗" delay={6.0} />
      </div>

      <motion.div className="absolute bottom-[8%] left-[8%] flex items-center gap-[1.2vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 8.1, duration: 0.4 }}>
        <span className="h-[1.25vmin] w-[1.25vmin] rounded-full" style={{ background: '#168AA2' }} />
        <span className="font-mono" style={{ color: '#28657B', fontSize: '1.9vmin', letterSpacing: '.15em', textTransform: 'uppercase' }}>Proposed rollout</span>
      </motion.div>
      <motion.div className="absolute bottom-[-16%] right-[2%] h-[47vmin] w-[47vmin] rounded-full border-[.35vmin]" initial={{ scale: 0.55, opacity: 0 }} animate={{ scale: [0.55, 1.4], opacity: [0.65, 0] }} transition={{ delay: 9.05, duration: 0.9, ease: 'easeIn' }} style={{ borderColor: '#00A4BF' }} />
    </motion.section>
  );
}
