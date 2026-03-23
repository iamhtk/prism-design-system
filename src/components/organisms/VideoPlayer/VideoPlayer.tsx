import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './VideoPlayer.module.css';

export type VideoPlayerProps = {
  src?: string;
  poster?: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const s = Math.floor(sec % 60);
  const m = Math.floor(sec / 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export const VideoPlayer = ({
  src,
  poster,
  title,
  autoplay = false,
  loop = false,
  muted = false,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [vol, setVol] = useState(1);
  const [mutedState, setMutedState] = useState(muted);

  useEffect(() => {
    setMutedState(muted);
  }, [muted]);

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = mutedState;
  }, [mutedState]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.volume = vol;
  }, [vol]);

  const seekFromClientX = (clientX: number) => {
    const el = videoRef.current;
    const track = progressRef.current;
    if (!el || !track || !duration) return;
    const rect = track.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    el.currentTime = (x / rect.width) * duration;
  };

  const toggleFullscreen = async () => {
    const root = rootRef.current;
    if (!root) return;
    if (!document.fullscreenElement) {
      await root.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  if (src == null || src === '') {
    return (
      <div
        ref={rootRef}
        className={styles.root}
        role="region"
        aria-label={title ?? 'Video player'}
      >
        {title != null ? (
          <span className={styles.visuallyHidden}>{title}</span>
        ) : null}
        <div className={styles.placeholder}>
          <div className={styles.placeholderPlay} aria-hidden />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={styles.root}
      role="region"
      aria-label={title ?? 'Video player'}
    >
      {title != null ? (
        <span className={styles.visuallyHidden}>{title}</span>
      ) : null}
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        playsInline
        controls={false}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={() => {
          const el = videoRef.current;
          if (el) setCurrent(el.currentTime);
        }}
        onLoadedMetadata={() => {
          const el = videoRef.current;
          if (el) setDuration(el.duration || 0);
        }}
        onEnded={() => setPlaying(false)}
      />
      <div className={styles.controls}>
        <div
          ref={progressRef}
          className={styles.progressTrack}
          role="slider"
          tabIndex={0}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(current)}
          aria-label="Seek"
          onClick={(e) => seekFromClientX(e.clientX)}
          onKeyDown={(e) => {
            const el = videoRef.current;
            if (!el || !duration) return;
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              el.currentTime = Math.min(duration, el.currentTime + 5);
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              el.currentTime = Math.max(0, el.currentTime - 5);
            }
          }}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className={styles.row}>
          <button
            type="button"
            className={styles.playBtn}
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={togglePlay}
          >
            {playing ? (
              <span className={styles.iconPause} aria-hidden />
            ) : (
              <span className={styles.iconPlay} aria-hidden />
            )}
          </button>
          <span className={styles.time} aria-live="polite">
            {formatTime(current)} / {formatTime(duration)}
          </span>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={mutedState ? 'Unmute' : 'Mute'}
            onClick={() => setMutedState((m) => !m)}
          >
            <span className={styles.volumeIcon} aria-hidden />
          </button>
          <input
            className={styles.volumeRange}
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={mutedState ? 0 : vol}
            aria-label="Volume"
            onChange={(e) => {
              const v = Number(e.target.value);
              setVol(v);
              if (v > 0) setMutedState(false);
            }}
          />
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Fullscreen"
            onClick={() => void toggleFullscreen()}
          >
            <span className={styles.fullscreenIcon} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
};
