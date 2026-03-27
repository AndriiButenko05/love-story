"use client";
import { useState } from "react";

const photos = [
  {
    id: 1,
    label: "Прогулка в нашем любимом месте",
    src: "/img1.jpg",
    color: "#ffe0e6",
  },
  { id: 2, label: "СУШИ)", src: "/img2.jpg", color: "#ffe8f0" },
  { id: 3, label: "Новий год", src: "/img3.jpg", color: "#ffd6e0" },
  { id: 4, label: "Старая квартира", src: "/img4.jpg", color: "#ffccd5" },
  {
    id: 5,
    label: "Рандомное фото",
    src: "/img5.jpg",
    color: "#ffe0e6",
  },
  { id: 6, label: "Первая встреча", src: "/img6.jpg", color: "#ffe8f0" },
  { id: 7, label: "Прага", src: "/img7.jpg", color: "#ffe8f0" },
  { id: 8, label: "Море)", src: "/img8.jpg", color: "#ffe8f0" },
];

export default function Gallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ padding: "80px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
          Наши моменты
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif), serif",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 700,
            color: "#800f2f",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          Моя королева 👑
        </h2>
        <p
          style={{
            color: "rgba(201,24,74,0.65)",
            fontWeight: 300,
            fontSize: "1.05rem",
          }}
        >
          Каждое фото — это кусочек нашего счастья
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            onMouseEnter={() => setHovered(photo.id)}
            onMouseLeave={() => setHovered(null)}
            className="photo-shine"
            style={{
              aspectRatio: "3/4",
              borderRadius: "24px",
              background: photo.color,
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              transform:
                hovered === photo.id
                  ? "scale(1.04) rotate(1deg)"
                  : "scale(1) rotate(0deg)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow:
                hovered === photo.id
                  ? "0 0 32px rgba(255,77,109,0.4)"
                  : "0 4px 16px rgba(255,77,109,0.1)",
            }}
          >
            {/* ЗАМЕНА ЭМОДЗИ НА ИЗОБРАЖЕНИЕ */}
            <img
              src={photo.src}
              alt={photo.label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Чтобы фото заполняло карточку без искажений
                display: "block",
                transition: "filter 0.3s ease",
                filter:
                  hovered === photo.id ? "brightness(1.1)" : "brightness(1)",
              }}
              onError={(e) => {
                // Если фото не загрузилось, покажем заглушку или цвет
                (e.target as HTMLImageElement).style.opacity = "0";
              }}
            />

            {/* Hover overlay (подпись при наведении) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(128,15,47,0.8), transparent)",
                display: "flex",
                alignItems: "flex-end",
                padding: "20px",
                opacity: hovered === photo.id ? 1 : 0,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {photo.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
