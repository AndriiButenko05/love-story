"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  { code: "ua", name: "Украина",    emoji: "🇺🇦", description: "Наш дом, откуда всё началось" },
  { code: "pl", name: "Польша",     emoji: "🇵🇱", description: "Варшава, Краков и незабываемые прогулки" },
  { code: "de", name: "Германия",   emoji: "🇩🇪", description: "Берлин и наши городские приключения" },
  { code: "me", name: "Черногория", emoji: "🇲🇪", description: "Адриатика, горы и потрясающие закаты" },
  { code: "cz", name: "Чехия",      emoji: "🇨🇿", description: "Прага — сказочный город на Влтаве" },
];

export default function MemoryMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const router = useRouter();

  return (
    <section style={{ padding: "80px 24px", position: "relative" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <p style={{
          color: "#ff4d6d",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: "12px",
        }}>
          Наши путешествия
        </p>
        <h2 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 700,
          color: "#800f2f",
          marginBottom: "12px",
        }}>
          Карта воспоминаний 🌍
        </h2>
        <p style={{ color: "rgba(201,24,74,0.65)", fontWeight: 300, marginBottom: "48px" }}>
          5 стран, сотни моментов, одна история
        </p>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",
          marginBottom: "40px",
        }}>
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => router.push(`/travel/${c.code}`)}
              onMouseEnter={() => setHovered(c.code)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === c.code
                  ? "linear-gradient(135deg, rgba(255,77,109,0.22), rgba(201,24,74,0.16))"
                  : "rgba(255,255,255,0.22)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "20px",
                padding: "24px 16px",
                cursor: "pointer",
                textAlign: "center",
                transform: hovered === c.code ? "scale(1.06) translateY(-4px)" : "scale(1) translateY(0)",
                transition: "all 0.25s ease",
                boxShadow: hovered === c.code ? "0 8px 32px rgba(255,77,109,0.2)" : "none",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, color: "#800f2f", fontSize: "0.9rem", marginBottom: "6px" }}>{c.name}</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(201,24,74,0.6)", lineHeight: 1.4 }}>{c.description}</div>
            </button>
          ))}
        </div>

        {/* Pills */}
        <div className="glass" style={{ borderRadius: "24px", padding: "32px" }}>
          <p style={{ color: "#800f2f", fontWeight: 600, marginBottom: "20px" }}>
            Нажми на страну — открой воспоминания ✈️
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => router.push(`/travel/${c.code}`)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #ff4d6d, #c9184a)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(255,77,109,0.3)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  fontFamily: "Poppins, sans-serif",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08) translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) translateY(0)";
                }}
              >
                <span>{c.emoji}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
