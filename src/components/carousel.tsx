"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AudioPlayer from "./audio-player";
import styles from "./carousel.module.css";
import "./carousel.css";

const slides = [
  {
    src: "/images/mock-1.svg",
    alt: "Mock image 1",
    title: "Slide 1",
    description:
      "A blue placeholder image used for the first carousel slide. It represents topic one of this mock gallery.",
  },
  {
    src: "/images/mock-2.svg",
    alt: "Mock image 2",
    title: "Slide 2",
    description:
      "A teal placeholder image used for the second carousel slide. It represents topic two of this mock gallery.",
  },
  {
    src: "/images/mock-3.svg",
    alt: "Mock image 3",
    title: "Slide 3",
    description:
      "An orange placeholder image used for the third carousel slide. It represents topic three of this mock gallery.",
  },
  {
    src: "/images/mock-4.svg",
    alt: "Mock image 4",
    title: "Slide 4",
    description:
      "A violet placeholder image used for the fourth carousel slide. It represents topic four of this mock gallery.",
  },
  {
    src: "/images/mock-5.svg",
    alt: "Mock image 5",
    title: "Slide 5",
    description:
      "A pink placeholder image used for the fifth carousel slide. It represents topic five of this mock gallery.",
  },
  {
    src: "/images/mock-6.svg",
    alt: "Mock image 6",
    title: "Slide 6",
    description:
      "A yellow placeholder image used for the sixth carousel slide. It represents topic six of this mock gallery.",
  },
  {
    src: "/images/mock-7.svg",
    alt: "Mock image 7",
    title: "Slide 7",
    description:
      "A sky blue placeholder image used for the seventh carousel slide. It represents topic seven of this mock gallery.",
  },
  {
    src: "/images/mock-8.svg",
    alt: "Mock image 8",
    title: "Slide 8",
    description:
      "A green placeholder image used for the eighth carousel slide. It represents topic eight of this mock gallery.",
  },
  {
    src: "/images/mock-9.svg",
    alt: "Mock image 9",
    title: "Slide 9",
    description:
      "A red placeholder image used for the ninth carousel slide. It represents topic nine of this mock gallery.",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const goTo = (i: number) => {
    setIndex((i + slides.length) % slides.length);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <div className={styles.grid}>
        {slides.map((slide, i) => {
          const focused = i === index;
          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => {
                goTo(i);
                setSelected(i);
              }}
              aria-label={`More info about ${slide.title}`}
              className={focused ? `${styles.slide} ${styles.slideFocused}` : styles.slide}
              style={{
                cursor: "pointer",
                padding: 0,
                border: "none",
                background: "none",
                borderRadius: "0.75rem",
                overflow: "hidden",
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={800}
                height={800}
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "0.75rem" }}
              />
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginTop: "0.75rem",
        }}
      >
        <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous slide">
          Previous
        </button>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: "0.75rem",
              height: "0.75rem",
              borderRadius: "50%",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: i === index ? "var(--nextra-primary-color, #111)" : "rgba(128,128,128,0.4)",
            }}
          />
        ))}
        <button type="button" onClick={() => goTo(index + 1)} aria-label="Next slide">
          Next
        </button>
      </div>

      {selected !== null && (
        <div
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`More info about ${slides[selected].title}`}
          className={styles.modalBackdrop}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.modalPanel}
            style={{
              flex: 1,
              minWidth: 0,
              minHeight: 0,
              background: "#ffffff",
              color: "#111",
              borderRadius: "1rem",
              boxSizing: "border-box",
            }}
          >
            <div
              className={styles.modalImage}
              style={{
                minWidth: 0,
                minHeight: 0,
                boxSizing: "border-box",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/pudu.png"
                alt={slides[selected].alt}
                width={800}
                height={800}
                style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", margin: 0, objectFit: "contain", borderRadius: "0.5rem" }}
              />
            </div>
            <div
              className={styles.modalText}
              style={{
                minWidth: 0,
                minHeight: 0,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "0.30rem",
                overflow: "hidden",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "clamp(1.5rem, 5vw, 2.25rem)", fontWeight: 700 }}>{slides[selected].title}</h2>
              <p style={{ margin: 0, fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
              <AudioPlayer src="/sound/pudu.mp3" label={slides[selected].title} />
              <div
                className={styles.video}
                style={{ flex: "1 1 auto", minHeight: "3rem", width: "100%" }}
              >
                <iframe
                  src="https://www.youtube.com/embed/2KlEkQ30beo"
                  title={`Video of ${slides[selected].title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{ border: "none", borderRadius: "0.5rem", display: "block" }}
                />
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className={styles.modalClose}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  backgroundColor: "#ffffff",
                  color: "#dc2626",
                  border: "2px solid #dc2626",
                  borderRadius: "0.75rem",
                  width: "100%",
                  boxSizing: "border-box",
                  height: "3.5rem",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22.3"
                  height="22.3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}