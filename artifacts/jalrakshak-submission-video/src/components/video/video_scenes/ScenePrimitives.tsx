import { motion } from 'framer-motion';

export const palette = {
  navy: '#0C1A2E',
  deep: '#071421',
  cyan: '#00B4D8',
  ice: '#7DD3FC',
  white: '#F0F9FF',
  muted: '#94A3B8',
  paper: '#EAF7F7',
  ink: '#123047',
};

export function WaterMark({ size = '5vmin', color = palette.cyan }: { size?: string; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 4C24 4 8 18 8 28C8 36.84 15.16 44 24 44C32.84 44 40 36.84 40 28C40 18 24 4 24 4Z" fill={`${color}33`} stroke={color} strokeWidth="2.4" />
      <path d="M16 30C16 30 18 26 24 26C30 26 32 30 32 30" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function SceneTag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ color: light ? '#16708A' : palette.cyan, fontSize: '1.9vmin', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
      {children}
    </div>
  );
}

export function MovingDot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      style={{ display: 'block', width: '1.15vmin', height: '1.15vmin', borderRadius: '50%', background: palette.cyan, boxShadow: `0 0 1.6vmin ${palette.cyan}99` }}
      animate={{ scale: [0.84, 1.18, 0.84], opacity: [0.76, 1, 0.76] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

export function RouteLine({ dark = false }: { dark?: boolean }) {
  return (
    <svg viewBox="0 0 1000 300" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
      <motion.path d="M30 225 C160 225 150 85 310 85 S450 225 575 225 S720 85 965 85" fill="none" stroke={dark ? '#168AA2' : palette.cyan} strokeWidth="5" strokeLinecap="round" pathLength="1" initial={{ pathLength: 0, opacity: 0.2 }} animate={{ pathLength: 1, opacity: 0.8 }} transition={{ duration: 2.8, ease: 'easeInOut' }} />
    </svg>
  );
}
