"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const MESSAGE_LINES = [
  "Ты — моё самое любимое приключение...",
  "Каждый день рядом с тобой — это подарок,",
  "Ты — моё сонце которое светит по утрам, даже когда погода хмурная🌹",
  "",
  "Ты делаешь мой мир ярче, теплее",
  "и намного лучше просто своим присутствием.",
  "",
  "Я люблю тебя сегодня, завтра",
  "и все дни, которые ещё впереди. ❤️",
];

function Modal({ onClose }: { onClose: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fade in
    requestAnimationFrame(() => setMounted(true));
    // Typewriter lines
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= MESSAGE_LINES.length) clearInterval(t);
    }, 420);
    return () => clearInterval(t);
  }, []);

  function handleClose() {
    setMounted(false);
    setTimeout(onClose, 300);
  }

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(61,0,25,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.3s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "rgba(255,240,243,0.97)",
          backdropFilter: "blur(20px)",
          borderRadius: "28px",
          padding: "clamp(32px, 5vw, 56px)",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 32px 80px rgba(255,77,109,0.25)",
          transform: mounted
            ? "scale(1) translateY(0)"
            : "scale(0.85) translateY(20px)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          cursor: "default",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>💌</div>
        <h3
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#800f2f",
            marginBottom: "28px",
          }}
        >
          Только для тебя
        </h3>

        <div style={{ textAlign: "left" }}>
          {MESSAGE_LINES.map((line, i) => (
            <p
              key={i}
              style={{
                color: "rgba(61,0,25,0.82)",
                lineHeight: 1.7,
                marginBottom: line ? "4px" : "12px",
                minHeight: line ? undefined : "8px",
                opacity: i < visibleLines ? 1 : 0,
                transform:
                  i < visibleLines ? "translateX(0)" : "translateX(-12px)",
                transition: "opacity 0.45s ease, transform 0.45s ease",
                fontSize: "0.975rem",
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {visibleLines >= MESSAGE_LINES.length && (
          <div
            style={{
              marginTop: "28px",
              opacity: 1,
              transition: "opacity 0.5s ease",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🌹</div>
            <button
              onClick={handleClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(201,24,74,0.65)",
                fontSize: "0.875rem",
                textDecoration: "underline",
                padding: "8px",
              }}
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default function SecretMessage() {
  const [open, setOpen] = useState(false);

  return (
    <section style={{ padding: "80px 24px", textAlign: "center" }}>
      <p
        style={{
          color: "#ff4d6d",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: "16px",
        }}
      >
        Специально для тебя
      </p>
      <h2
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 700,
          color: "#800f2f",
          marginBottom: "40px",
        }}
      >
        Секретное послание 💌
      </h2>

      <button
        onClick={() => setOpen(true)}
        className="btn-glow"
        style={{
          padding: "18px 44px",
          borderRadius: "100px",
          background: "linear-gradient(135deg, #ff4d6d, #c9184a)",
          color: "white",
          fontWeight: 600,
          fontSize: "1.05rem",
          border: "none",
          cursor: "pointer",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Нажми, если любишь меня ❤️
      </button>

      {open && <Modal onClose={() => setOpen(false)} />}
    </section>
  );
}
