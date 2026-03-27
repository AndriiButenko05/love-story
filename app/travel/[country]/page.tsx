"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

type EaseCurve = [number, number, number, number];
const EASE: EaseCurve = [0.25, 0.46, 0.45, 0.94];

const MEMORY_LABELS = [
  "Наше особенное утро",
  "Улыбка, которую я обожаю",
  "Моменты счастья",
  "Вместе сквозь время",
  "Твой смех",
  "Прогулки за руку",
  "Лучший день",
  "Люблю тебя",
  "Наш вечер",
  "Просто мы",
  "Незабываемо",
  "В моем сердце",
];

// 1. ДОБАВЛЯЕМ СВОЙСТВО photoCount ДЛЯ КАЖДОЙ СТРАНЫ
const COUNTRY_DATA: Record<
  string,
  {
    name: string;
    emoji: string;
    description: string;
    photoCount: number; // Указываем точное количество фото для этой страны
  }
> = {
  ua: {
    name: "Украина",
    emoji: "🇺🇦",
    description: "Наш дом. Место, где началась наша история.",
    photoCount: 10, // Например, тут 10 фото
  },
  pl: {
    name: "Польша",
    emoji: "🇵🇱",
    description: "Наша история сейчас",
    photoCount: 8, // А тут 8
  },
  de: {
    name: "Германия",
    emoji: "🇩🇪",
    description: "Берлин — город контрастов. Ворота, хайм, Бернау)",
    photoCount: 6, // А тут 6
  },
  me: {
    name: "Черногория",
    emoji: "🇲🇪",
    description:
      "Адриатика, горы Дурмитора и Которский залив. Там, где море встречает небо.",
    photoCount: 12,
  },
  cz: {
    name: "Чехия",
    emoji: "🇨🇿",
    description:
      "Прага — сказочный город на Влтаве. Карлов мост, красные крыши и тёплые вечера. И ПИВО!!!!!",
    photoCount: 7,
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function CountryPage() {
  const params = useParams();
  const router = useRouter();
  const country = (params.country as string)?.toLowerCase();
  const data = COUNTRY_DATA[country];

  if (!data) {
    return (
      <div className="min-h-screen bg-romantic flex items-center justify-center text-center px-6">
        <div>
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-3xl font-bold text-[#800f2f] mb-4">
            Страна не найдена
          </h1>
          <button
            onClick={() => router.push("/")}
            className="text-[#ff4d6d] underline"
          >
            ← Назад
          </button>
        </div>
      </div>
    );
  }

  // 2. ГЕНЕРИРУЕМ МАССИВ ОПИРАЯСЬ НА data.photoCount
  const photos = Array.from({ length: data.photoCount }, (_, i) => ({
    id: i + 1,
    src: `/${country}/img${i + 1}.jpg`,
    label: MEMORY_LABELS[i % MEMORY_LABELS.length], // Используем остаток от деления, чтобы надписи повторялись, если фото больше, чем надписей
  }));

  return (
    <main className="min-h-screen bg-romantic">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 px-6 text-center">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="absolute top-6 left-6 flex items-center gap-2 text-[#c9184a]/70 hover:text-[#c9184a] transition-colors text-sm font-medium glass px-4 py-2 rounded-full z-10"
        >
          ← Назад
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="text-8xl mb-6">{data.emoji}</div>
          <p className="text-[#ff4d6d] text-sm uppercase tracking-widest font-semibold mb-3">
            Наши воспоминания
          </p>
          <h1
            className="text-6xl md:text-8xl font-bold text-[#800f2f] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            {data.name}
          </h1>
          <p className="text-lg text-[#c9184a]/70 font-light max-w-xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        {/* 3. ИСПОЛЬЗУЕМ auto-fill ДЛЯ АВТОМАТИЧЕСКОГО РАЗМЕЩЕНИЯ */}
        <motion.div
          className="grid gap-6"
          style={{
            // Это заставит сетку автоматически подстраиваться.
            // Карточки будут шириной минимум 250px, и заполнят весь ряд.
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative rounded-3xl overflow-hidden photo-shine shadow-lg"
              style={{ aspectRatio: "3/4", background: "#fce4ec" }}
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300x400?text=Missing+Photo";
                }}
              />
              {/* Overlay with label */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#800f2f]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-sm font-medium">{photo.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer & Back Button */}
      <section className="py-16 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/")}
          className="btn-glow px-10 py-4 rounded-full text-white font-semibold"
          style={{ background: "linear-gradient(135deg, #ff4d6d, #c9184a)" }}
        >
          ← Вернуться к нашей истории
        </motion.button>
        <footer className="mt-12 text-[#c9184a]/40 text-sm">
          Сделано с любовью ❤️
        </footer>
      </section>
    </main>
  );
}
