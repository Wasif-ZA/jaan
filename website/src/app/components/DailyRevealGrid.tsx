// GalleryComponents.tsx
// Next.js (App Router) **TypeScript** client‑side components
// — DailyRevealGrid: 27‑day flip‑card calendar (local images)
// — SwipeCards: Tinder‑style swipe deck that uses *all* images from the same pool
//
// `image‑manifest.json` is created at build time by scripts/generateImageManifest.ts.
// Put any pictures in `/public/images/` — no naming rules needed.

"use client";

import React, { useState, useEffect, type FC } from "react";
import type { IconType } from "react-icons";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { IoHeartSharp } from "react-icons/io5";
import { RiHeartFill } from "react-icons/ri";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

/******************************************************************************************
 * IMAGE MANIFEST  ➜  LOCAL_IMAGES
 ******************************************************************************************/
// tsconfig.json must include:  "resolveJsonModule": true  &  "esModuleInterop": true
import imageManifest from "../../../image-manifest.json";
const LOCAL_IMAGES: string[] = (imageManifest as string[]).filter(Boolean);

/******************************************************************************************
 * DAILY REVEAL GRID
 ******************************************************************************************/
const START_ISO = "2025-06-21";              // inclusive start date
const TOTAL_DAYS = 27;                        // 21 Jun → 17 Jul
const MS_PER_DAY = 86_400_000;

const HEART_ICONS: IconType[] = [
  FiHeart,
  FaHeart,
  BsSuitHeartFill,
  AiFillHeart,
  IoHeartSharp,
  RiHeartFill,
];

interface DayMeta {
  date: Date;
  shortLabel: string;
  img: string;
  caption: string;
  iconIdx: number;
}

const buildDayData = (): DayMeta[] => {
  const start = new Date(`${START_ISO}T00:00:00+10:00`); // force AEST offset
  return Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const date = new Date(start.getTime() + i * MS_PER_DAY);
    const imgFile = LOCAL_IMAGES[i % LOCAL_IMAGES.length] ?? "fallback.jpg";

    return {
      date,
      shortLabel: date.toLocaleDateString("en-AU", { day: "numeric", month: "short" }),
      img: `/images/${imgFile}`,
      caption: `Surprise for ${date.toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })}`,
      iconIdx: i % HEART_ICONS.length,
    };
  });
};

const DAY_DATA = buildDayData();
const isToday = (d: Date) => {
  const n = new Date();
  return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
};

interface DayCardProps { meta: DayMeta; }
const DayCard: FC<DayCardProps> = ({ meta }) => {
  const [open, setOpen] = useState(false);
  const locked = !isToday(meta.date);
  const Icon = HEART_ICONS[meta.iconIdx];
  const colorClass = locked ? "text-gray-400" : meta.iconIdx % 2 === 0 ? "text-pink-400" : "text-pink-500";

  return (
    <motion.div onClick={() => !locked && setOpen((p) => !p)} className="group relative aspect-[3/4] w-full select-none">
      <div className={`relative h-full w-full overflow-hidden rounded-lg p-0.5 transition-colors duration-300 ${locked ? "bg-gray-300" : "bg-slate-800"}`}>
        <AnimatePresence initial={false} mode="wait">
          {open ? (
            <motion.div key="back" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} exit={{ rotateY: 90 }} transition={{ duration: 0.3 }} className="flex h-full flex-col rounded-[7px] bg-pink-500">
              <img src={meta.img} alt="Surprise" className="h-2/3 w-full object-cover" />
              <p className="flex-grow px-2 py-2 text-center text-xs sm:text-sm text-white leading-snug">{meta.caption}</p>
            </motion.div>
          ) : (
            <motion.div key="front" initial={{ rotateY: 0 }} animate={{ rotateY: 0 }} exit={{ rotateY: 90 }} transition={{ duration: 0.3 }} className={`flex h-full flex-col items-center justify-center rounded-[7px] bg-pink-100 transition-colors duration-300 ${locked ? "bg-gray-200" : "group-hover:bg-pink-500"}`}>
              <span className={`mb-3 text-4xl sm:text-5xl ${colorClass}`}><Icon /></span>
              <span className={`text-xl sm:text-2xl font-bold ${locked ? "text-gray-400" : "text-pink-700"}`}>{meta.shortLabel}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {!locked && (
          <motion.div initial={{ rotate: "0deg" }} animate={{ rotate: "360deg" }} style={{ scale: 1.75 }} transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }} className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-pink-300 via-pink-300/0 to-pink-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}
      </div>
    </motion.div>
  );
};

const DailyRevealGrid: FC = () => (
  <section className="mx-auto max-w-6xl px-3 sm:px-4 py-8 sm:py-12">
    <h1 className="mb-8 sm:mb-10 text-center text-3xl sm:text-4xl font-extrabold text-pink-600">27‑Day Reveal Calendar</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5" style={{ gridAutoRows: "1fr" }}>
      {DAY_DATA.map((d) => <DayCard key={d.date.toISOString()} meta={d} />)}
    </div>
  </section>
);

/******************************************************************************************
 * SWIPE CARDS  (uses ALL images, shuffles client‑side)
 ******************************************************************************************/
interface CardItem { id: number; url: string; }
const allSwipeCards: CardItem[] = LOCAL_IMAGES.map((file, idx) => ({ id: idx + 1, url: `/images/${file}` }));

export const SwipeCards: FC = () => {
  const [cards, setCards] = useState<CardItem[]>(allSwipeCards);

  // 💡 Shuffle once on the client after hydration to avoid SSR mismatch
  useEffect(() => {
    setCards((prev) => {
      const a = [...prev];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    });
  }, []);

  return (
    <div className="grid h-[500px] w-full place-items-center bg-neutral-100" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")` }}>
      {cards.map((c) => <SwipeCard key={c.id} item={c} cards={cards} setCards={setCards} />)}
    </div>
  );
};

interface SwipeCardProps {
  item: CardItem;
  cards: CardItem[];
  setCards: React.Dispatch<React.SetStateAction<CardItem[]>>;
}

const SwipeCard: FC<SwipeCardProps> = ({ item, cards, setCards }) => {
  const { id, url } = item;
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = cards[cards.length - 1]?.id === id;
  const rotate = useTransform(() => `${rotateRaw.get() + (isFront ? 0 : id % 2 ? 6 : -6)}deg`);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((prev) => prev.filter((v) => v.id !== id));
    }
  };

  return (
    <motion.img
      src={url}
      alt={`Swipe card ${id}`}
      className="h-96 w-72 origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.15s transform",
        boxShadow: isFront ? "0 20px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.4)" : "",
      }}
      animate={{ scale: isFront ? 1 : 0.98 }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    />
  );
};

/******************************************************************************************
 * EXPORTS
 ******************************************************************************************/
export default DailyRevealGrid;
