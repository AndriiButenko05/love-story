"use client";
import { useState } from "react";
import IntroStory from "@/components/IntroStory";
import LoveCounter from "@/components/LoveCounter";
import Gallery from "@/components/Gallery";
import MemoryMap from "@/components/MemoryMap";
import SecretMessage from "@/components/SecretMessage";
import FinalBlock from "@/components/FinalBlock";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="bg-romantic min-h-screen">
      {!introComplete && (
        <IntroStory onComplete={() => setIntroComplete(true)} />
      )}

      <div style={{ display: introComplete ? "block" : "none" }}>
        {/* Hero */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 24px 40px",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Decorative hearts - pointer-events: none so they NEVER block clicks */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
            {["💗","💕","🌸","✨","💖"].map((h, i) => (
              <span
                key={i}
                className="float-heart"
                style={{
                  position: "absolute",
                  fontSize: `${2 + (i % 3) * 0.8}rem`,
                  left: `${5 + i * 18}%`,
                  top: `${10 + (i % 3) * 25}%`,
                  opacity: 0.18,
                  animationDelay: `${i * 0.6}s`,
                  pointerEvents: "none",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{
              color: "#ff4d6d",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "16px",
            }}>
              Наша история
            </p>
            <h1 style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 700,
              color: "#800f2f",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}>
              Моя<br />
              <span style={{ fontStyle: "italic", color: "#ff4d6d" }}>королева</span>
              {" "}👑
            </h1>
            <p style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "rgba(201,24,74,0.7)",
              fontWeight: 300,
              maxWidth: "520px",
              lineHeight: 1.7,
              marginBottom: "48px",
            }}>
              Ты — моя вселенная, моя радость,<br />
              моё самое большое счастье
            </p>
            <a
              href="#counter"
              className="btn-glow"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 36px",
                borderRadius: "100px",
                background: "linear-gradient(135deg, #ff4d6d, #c9184a)",
                color: "white",
                fontWeight: 600,
                fontSize: "1rem",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Начать путешествие ↓
            </a>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}>
            <div style={{
              width: "24px",
              height: "40px",
              borderRadius: "12px",
              border: "2px solid rgba(255,77,109,0.35)",
              display: "flex",
              justifyContent: "center",
              paddingTop: "6px",
            }}>
              <div style={{
                width: "4px",
                height: "10px",
                borderRadius: "2px",
                background: "rgba(255,77,109,0.55)",
                animation: "float-heart 2s ease-in-out infinite",
              }} />
            </div>
          </div>
        </section>

        <div id="counter"><LoveCounter /></div>

        <Divider emoji="🌸" />
        <Gallery />
        <Divider emoji="✈️" />
        <MemoryMap />
        <Divider emoji="💌" />
        <SecretMessage />
        <Divider emoji="🌅" />
        <FinalBlock />

        <footer style={{ textAlign: "center", padding: "32px", color: "rgba(201,24,74,0.4)", fontSize: "0.875rem" }}>
          Сделано с любовью ❤️
        </footer>
      </div>
    </main>
  );
}

function Divider({ emoji }: { emoji: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "0 32px", maxWidth: "768px", margin: "0 auto" }}>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(255,77,109,0.3))" }} />
      <span style={{ fontSize: "1.5rem" }}>{emoji}</span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(255,77,109,0.3))" }} />
    </div>
  );
}
