"use client";

export default function FinalBlock() {
  return (
    <section style={{ padding: "80px 24px 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {["💗","💕","✨","🌹","💖","🌸","❤️","💫"].map((h, i) => (
          <span key={i} className="float-heart" style={{
            position: "absolute",
            fontSize: `${1.5 + (i % 3) * 0.8}rem`,
            left: `${8 + i * 11}%`,
            top: `${15 + (i % 4) * 18}%`,
            opacity: 0.18,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + (i % 3)}s`,
            pointerEvents: "none",
          }}>{h}</span>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ fontSize: "4rem", marginBottom: "32px" }}>🌅</div>
        <h2 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          fontWeight: 700,
          color: "#800f2f",
          lineHeight: 1.15,
          marginBottom: "32px",
        }}>
          А дальше будет<br />
          <span style={{ fontStyle: "italic", color: "#ff4d6d" }}>ещё больше</span>
        </h2>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              fontSize: "2rem",
              color: "#ff4d6d",
              animation: "float-heart 1.6s ease-in-out infinite",
              animationDelay: `${i * 0.3}s`,
              display: "inline-block",
            }}>•</span>
          ))}
        </div>

        <p style={{
          marginTop: "48px",
          color: "rgba(201,24,74,0.55)",
          fontSize: "1.05rem",
          fontWeight: 300,
          fontStyle: "italic",
        }}>
          Эта страница растёт вместе с нашей историей 💞
        </p>
      </div>
    </section>
  );
}
