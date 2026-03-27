"use client";
import { useEffect, useState } from "react";

// Устанавливаем дату: 2023 год, 6 (июль), 30 число
const START_DATE = new Date(2023, 6, 30, 0, 0, 0);

function getTime() {
  const diff = Date.now() - START_DATE.getTime();

  // Если дата еще не наступила (на всякий случай), возвращаем нули
  if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="glass"
      style={{
        borderRadius: "20px",
        padding: "clamp(16px, 3vw, 28px) clamp(16px, 4vw, 36px)",
        minWidth: "80px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif), serif", // Используем переменную из globals.css
          fontSize: "clamp(2.5rem, 8vw, 4rem)",
          fontWeight: 700,
          color: "#ff4d6d",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {/* Для дней убираем padStart, чтобы не было "0450" дней, а просто "450" */}
        {label === "дней" ? value : String(value).padStart(2, "0")}
      </div>
      <div
        style={{
          fontSize: "0.7rem",
          color: "rgba(201,24,74,0.65)",
          marginTop: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function LoveCounter() {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const t = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: "80px 24px", position: "relative" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            color: "#ff4d6d",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          Мы вместе уже
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif), serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            color: "#800f2f",
            marginBottom: "48px",
            lineHeight: 1.2,
          }}
        >
          Считаем каждый{" "}
          <span style={{ fontStyle: "italic", color: "#ff4d6d" }}>момент</span>
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(8px, 2vw, 24px)",
            flexWrap: "wrap",
          }}
        >
          <Unit value={time.days} label="дней" />
          <Unit value={time.hours} label="часов" />
          <Unit value={time.minutes} label="минут" />
          <Unit value={time.seconds} label="секунд" />
        </div>

        <p
          style={{
            marginTop: "40px",
            color: "rgba(201,24,74,0.6)",
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          С 30 июля 2023 года 🌹
        </p>
      </div>
    </section>
  );
}
