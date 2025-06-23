"use client";

import React, { useEffect, useState, type FC } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

/* ------------------------------------------------------------------
   1.  IMAGE POOL — auto-generated manifest
   ----------------------------------------------------------------- */
//  ◉ Ensure tsconfig.json has:  "resolveJsonModule": true, "esModuleInterop": true
import imageManifest from "../../../image-manifest.json";       // ← adjust if you place this file deeper
const LOCAL_IMAGES: string[] = (imageManifest as string[]).filter(Boolean);

/* ------------------------------------------------------------------
   2.  Types
   ----------------------------------------------------------------- */
interface CardItem {
  id: number;
  url: string;
}

/* ------------------------------------------------------------------
   3.  Parent component
   ----------------------------------------------------------------- */
const SwipeCards: FC = () => {
  // build deterministically first → avoid SSR hydration mismatch
  const [cards, setCards] = useState<CardItem[]>(
    LOCAL_IMAGES.map((file, idx) => ({ id: idx + 1, url: `/images/${file}` }))
  );

  // one-time shuffle on client
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
    <div
      className="grid h-[500px] w-full place-items-center bg-neutral-100"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      }}
    >
      {cards.map((c) => (
        <SwipeCard
          key={c.id}
          item={c}
          cards={cards}
          setCards={setCards}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------
   4.  Individual swipe card
   ----------------------------------------------------------------- */
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
  const rotate = useTransform(
    () => `${rotateRaw.get() + (isFront ? 0 : id % 2 ? 6 : -6)}deg`
  );

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
        boxShadow: isFront
          ? "0 20px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.4)"
          : "",
      }}
      animate={{ scale: isFront ? 1 : 0.98 }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    />
  );
};

export default SwipeCards;
