"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AudioPlayer from "./audio-player";
import "./carousel.css";

const slides: {
  src: string;
  alt: string;
  title: string;
  description: string;
  subtitle?: string;
  modalText?: string;
  modalSrc?: string;
  modalVideoId?: string;
}[] = [
  {
    src: "/images/mock-1.svg",
    alt: "Mock image 1",
    title: "Pudu",
    description:
      "A blue placeholder image used for the first carousel slide. It represents topic one of this mock gallery.",
    subtitle: "Pudu puda",
    modalText: "El pudú es el ciervo más pequeño del mundo: mide apenas 35 a 45 cm de alto, ¡como un gato grande! Vive en los bosques húmedos del sur de Chile, donde se esconde entre el follaje con sus pasitos sigilosos.",
  },
  {
    src: "/images/mock-2.svg",
    alt: "Mock image 2",
    title: "Monito del Monte",
    description:
      "A teal placeholder image used for the second carousel slide. It represents topic two of this mock gallery.",
    subtitle: "Dromiciops gliroides",
    modalText: "El monito del monte hiberna en invierno y guarda grasa en su cola, que puede duplicar su grosor. Además, es un “fósil viviente”: el único sobreviviente de un linaje de marsupiales de hace más de 40 millones de años.",
    modalSrc: "/images/Monito-del-monte.png",
    modalVideoId: "gVCCMK-mbEg",
  },
  {
    src: "/images/mock-3.svg",
    alt: "Mock image 3",
    title: "Chinchilla",
    description:
      "An orange placeholder image used for the third carousel slide. It represents topic three of this mock gallery.",
    subtitle: "Chinchilla chinchilla",
    modalText: "La chinchilla tiene el pelaje más denso entre los mamíferos terrestres: hasta 60 pelos por folículo, lo que impide que las pulgas vivan en él. Además, se “baña” en polvo volcánico en vez de agua, porque su pelo mojado tarda mucho en secar y puede enmohecerse.",
    modalSrc: "/images/chinchilla.png",
    modalVideoId: "9Zlkcs4DZ5Y",
  },
  {
    src: "/images/mock-4.svg",
    alt: "Mock image 4",
    title: "Cóndor Andino",
    description:
      "A violet placeholder image used for the fourth carousel slide. It represents topic four of this mock gallery.",
    subtitle: "Vultur gryphus",
    modalText: "El cóndor andino puede planear horas sin aplaudir sus alas, aprovechando las corrientes de aire. Además, vive más de 70 años y es símbolo nacional de Chile.",
    modalSrc: "/images/condor.png",
    modalVideoId: "AU8XN1TG0SY",
  },
  {
    src: "/images/mock-5.svg",
    alt: "Mock image 5",
    title: "Huemul",
    description:
      "A pink placeholder image used for the fifth carousel slide. It represents topic five of this mock gallery.",
    subtitle: "Hippocamelus bisulcus",
    modalText: "Aparece en el escudo nacional de Chile, junto al cóndor, y es uno de los ciervos más amenazados del mundo, con apenas unos pocos miles de ejemplares.",
    modalSrc: "/images/huemul.png",
    modalVideoId: "Slnwfb3fqhk",
  },
  {
    src: "/images/mock-6.svg",
    alt: "Mock image 6",
    title: "Puma Concolor",
    description:
      "A yellow placeholder image used for the sixth carousel slide. It represents topic six of this mock gallery.",
    subtitle: "Puma concolor",
    modalText: "El puma no puede rugir, pero ronronea, silba y chilla, y es un atleta increíble: puede saltar hasta 5 metros de altura y 12 metros de largo. Además, es el mamífero terrestre con mayor distribución de América, ya que habita desde Canadá hasta la Patagonia.",
    modalSrc: "/images/puma.png",
    modalVideoId: "4c9KmG95zNI",
  },
  {
    src: "/images/mock-7.svg",
    alt: "Mock image 7",
    title: "Pingüino de Humboldt",
    description:
      "A sky blue placeholder image used for the seventh carousel slide. It represents topic seven of this mock gallery.",
    subtitle: "Spheniscus humboldti",
    modalText: "El pingüino de Humboldt es un pingüino de clima templado que anida en cuevas y madrigueras cavadas en el guano, y puede bucear hasta 150 metros persiguiendo anchovetas y sardinas.",
    modalSrc: "/images/pinguino-de-humboldt.png",
    modalVideoId: "HROKya62maY",
  },
  {
    src: "/images/mock-8.svg",
    alt: "Mock image 8",
    title: "Ranita de Darwin",
    description:
      "A green placeholder image used for the eighth carousel slide. It represents topic eight of this mock gallery.",
    subtitle: "Rhinoderma darwinii",
    modalText: "El macho guarda los huevos en su saco vocal hasta que se convierten en ranitas, y luego las “escupe” por la boca ya formadas.",
    modalSrc: "/images/ranita-de-darwin.png",
    modalVideoId: "nuyka1zTCIg",
  },
  {
    src: "/images/mock-9.svg",
    alt: "Mock image 9",
    title: "Pájaro de 7 Colores",
    description:
      "A red placeholder image used for the ninth carousel slide. It represents topic nine of this mock gallery.",
    subtitle: "Tachuris rubrigastra",
    modalText: "Pese a pesar apenas unos 10 gramos, luce un plumaje con muchos colores, y construye su nido en forma de copa entre los juncos y totoras de lagunas y pantanos.",
    modalSrc: "/images/tachuris-rubigastra.png",
    modalVideoId: "hJVV6hX3JA8",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const goTo = (i: number) => {
    setIndex((i + slides.length) % slides.length);
  };

  const goPrev = () =>
    setSelected((s) => (s === null ? s : (s - 1 + slides.length) % slides.length));
  const goNext = () =>
    setSelected((s) => (s === null ? s : (s + 1) % slides.length));

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const bumpArrow = (el: HTMLButtonElement | null) => {
    el?.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.5)", offset: 0.1 },
        { transform: "scale(1)" },
      ],
      { duration: 400, easing: "ease-out" }
    );
  };

  const pressPrev = () => {
    bumpArrow(prevRef.current);
    goPrev();
  };
  const pressNext = () => {
    bumpArrow(nextRef.current);
    goNext();
  };

  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 50) return;
    if (deltaX < 0) goNext();
    else goPrev();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowLeft")
        setSelected((s) => (s === null ? s : (s - 1 + slides.length) % slides.length));
      if (e.key === "ArrowRight")
        setSelected((s) => (s === null ? s : (s + 1) % slides.length));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="carousel-grid">
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
              className={focused ? "carousel-slide carousel-slide-focused" : "carousel-slide"}
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
                loading="eager"
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
          className="carousel-modal-backdrop"
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
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="carousel-modal-panel"
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
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="carousel-modal-close"
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                zIndex: 10,
                width: "3rem",
                height: "3rem",
                boxSizing: "border-box",
                backgroundColor: "#9b6750",
                color: "#ffffff",
                border: "none",
                borderRadius: "50%",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="26.76"
                height="26.76"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div className="carousel-modal-spacer" aria-hidden="true" />
            <div
              className="carousel-modal-image"
              style={{
                minWidth: 0,
                minHeight: 0,
                boxSizing: "border-box",
                display: "flex",
                overflow: "visible",
              }}
            >
              <img
                src={slides[selected].modalSrc ?? "/images/pudushadow.png"}
                alt={slides[selected].alt}
                width={800}
                height={800}
                style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", margin: 0, objectFit: "contain", borderRadius: "0.5rem" }}
              />
              <button
                ref={prevRef}
                type="button"
                onClick={pressPrev}
                aria-label="Previous slide"
                className="carousel-modal-prev"
              >
                ‹
              </button>
              <button
                ref={nextRef}
                type="button"
                onClick={pressNext}
                aria-label="Next slide"
                className="carousel-modal-next"
              >
                ›
              </button>
            </div>
            <div
              className="carousel-modal-text"
              style={{
                minWidth: 0,
                minHeight: 0,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px", marginBottom: "0.25rem" }}>
                <h2 className="modal-title" style={{ margin: 0, fontSize: "clamp(1.5rem, 5vw, 2.25rem)", fontWeight: 900, fontFamily: "var(--font-roboto), system-ui, sans-serif" }}>{slides[selected].title}</h2>
                <p className="modal-subtitle" style={{ margin: 0, fontStyle: "italic", fontWeight: 700, fontFamily: "var(--font-raleway), system-ui, sans-serif", fontSize: "1rem", color: "#444" }}>
                  {slides[selected].subtitle ?? "Lorem Ipsum"}
                </p>
              </div>
              <p className="modal-text" style={{ margin: 0, fontSize: "clamp(0.875rem, 2.5vw, 1rem)", fontWeight: 500 }}>
                {slides[selected].modalText ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."}
              </p>
              <AudioPlayer src="/sound/pudu.mp3" label={slides[selected].title} />
              <div
                className="carousel-modal-video"
                style={{ width: "100%" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${slides[selected].modalVideoId ?? "2KlEkQ30beo"}`}
                  title={`Video of ${slides[selected].title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  style={{ border: "none", borderRadius: "0.5rem", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}