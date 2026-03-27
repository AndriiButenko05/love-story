import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Наша история любви",
  description: "Наша история любви",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
