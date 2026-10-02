import { useEffect, type ComponentType } from 'react';
import {
  VideoCanvas,
  VideoPausedContext,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence } from 'framer-motion';

import { ImpactScene } from './video_scenes/ImpactScene';
import { ReportScene } from './video_scenes/ReportScene';
import { ResponseScene } from './video_scenes/ResponseScene';
import { RolloutScene } from './video_scenes/RolloutScene';
import { SignalScene } from './video_scenes/SignalScene';

export const SCENE_DURATIONS = {
  signal: 9000,
  citizenReport: 10000,
  responseLoop: 11000,
  rollout: 10000,
  impactClose: 10000,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '16:9';
const SCENE_COMPONENTS: Record<string, ComponentType> = {
  signal: SignalScene,
  citizenReport: ReportScene,
  responseLoop: ResponseScene,
  rollout: RolloutScene,
  impactClose: ImpactScene,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop, paused });
  const sceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const SceneComponent = SCENE_COMPONENTS[sceneKey];

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  return (
    <VideoPausedContext.Provider value={paused}>
      <VideoCanvas aspectRatio={VIDEO_ASPECT_RATIO} style={{ backgroundColor: 'var(--color-bg-dark)' }}>
        <AnimatePresence mode="wait">
          {SceneComponent && <SceneComponent key={currentSceneKey} />}
        </AnimatePresence>
      </VideoCanvas>
    </VideoPausedContext.Provider>
  );
}
