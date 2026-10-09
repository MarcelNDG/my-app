import { useEffect, useRef, useState } from "react";
import styles from "./audio-player.module.css";

type Props = {
  src: string;
  label: string;
};

function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src, label }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration);
    const onTime = () => setCurrent(audio.currentTime);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const next = Number(e.target.value);
    if (!audio) return;
    audio.currentTime = next;
    setCurrent(next);
  };

  const percent = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        width: "100%",
        boxSizing: "border-box",
        padding: "0.5rem",
        border: "2px solid #3e2723",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      <audio ref={audioRef} src={src} preload="none" />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pausar ${label}` : `Reproducir ${label}`}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          width: "3rem",
          height: "3rem",
          backgroundColor: "#ffffff",
          color: "#3e2723",
          border: "2px solid #3e2723",
          borderRadius: "50%",
        }}
      >
        {playing ? (
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="36"
            height="36"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5.5v13l11-6.5-11-6.5z" />
          </svg>
        )}
      </button>

      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.01}
        value={current}
        onChange={seek}
        aria-label={`Progreso de ${label}`}
        className={styles.range}
        style={
          {
            "--percent": `${percent}%`,
          } as React.CSSProperties
        }
      />

      <span
        style={{
          flexShrink: 0,
          fontSize: "0.875rem",
          fontVariantNumeric: "tabular-nums",
          fontWeight: 700,
          color: "#3e2723",
        }}
      >
        {formatTime(current)} / {formatTime(duration)}
      </span>
    </div>
  );
}