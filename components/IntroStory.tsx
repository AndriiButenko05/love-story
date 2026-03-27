"use client";
import { useState, useEffect } from "react";

const slides = [
  {
    emoji: "🌸",
    text: "Это история...",
    sub: "которая началась с одной прогулки",
  },
  {
    emoji: "💫",
    text: "История о нас...",
    sub: "о наших моментах, наших воспоминаниях",
  },
  {
    emoji: "❤️",
    text: "Наша история...",
    sub: "и она продолжается каждый день",
  },
];

export default function IntroStory({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (idx < slides.length - 1) {
        setFading(true);
        setTimeout(() => {
          setIdx((i) => i + 1);
          setFading(false);
        }, 400);
      } else {
        handleComplete();
      }
    }, 2200);
    return () => clearTimeout(t);
  }, [idx]);

  function handleComplete() {
    setLeaving(true);
    setTimeout(onComplete, 900);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.8s ease",
        pointerEvents: leaving ? "none" : "auto",
      }}
      className="bg-romantic"
    >
      {/* Decorative hearts */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {["💗", "💕", "🌸", "✨", "💖", "🌹"].map((h, i) => (
          <span
            key={i}
            className="float-heart"
            style={{
              position: "absolute",
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              fontSize: `${1.5 + (i % 3) * 0.5}rem`,
              opacity: 0.25,
              animationDelay: `${i * 0.5}s`,
              pointerEvents: "none",
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Slide content */}
      <div
        style={{
          textAlign: "center",
          padding: "0 32px",
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(-20px)" : "translateY(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: "5rem", marginBottom: "24px" }}>
          {slides[idx].emoji}
        </div>
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            fontWeight: 700,
            color: "#800f2f",
            marginBottom: "16px",
            letterSpacing: "0.02em",
          }}
        >
          {slides[idx].text}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#c9184a", fontWeight: 300 }}>
          {slides[idx].sub}
        </p>
      </div>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          display: "flex",
          gap: "12px",
          pointerEvents: "none",
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === idx ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === idx ? "#ff4d6d" : "#ffb3c6",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Skip button */}
      <button
        onClick={handleComplete}
        style={{
          position: "absolute",
          bottom: "28px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(201,24,74,0.55)",
          fontSize: "0.875rem",
          padding: "8px 16px",
          zIndex: 10,
        }}
      >
        пропустить →
      </button>
    </div>
  );
}
