"use client";

import React, { useState, type FC, type Dispatch, type SetStateAction } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/** ───────────────────────────────────────────────
 *  Types
 * ─────────────────────────────────────────────── */
interface CardItem {
  id:  number;
  url: string;
}

interface CardProps extends CardItem {
  cards:    CardItem[];
  setCards: Dispatch<SetStateAction<CardItem[]>>;
}

/** ───────────────────────────────────────────────
 *  Your static data
 * ─────────────────────────────────────────────── */
const cardData: CardItem[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  url: `/images/pic${i + 1}.jpg`,
}));

/** ───────────────────────────────────────────────
 *  1. SwipeCards (parent)
 * ─────────────────────────────────────────────── */
const SwipeCards: FC = () => {
  const [cards, setCards] = useState<CardItem[]>(cardData);

  return (
    <div
      className="grid h-[500px] w-full place-items-center bg-neutral-100"
      style={{
        backgroundImage:
          'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke-width=\'2\' stroke=\'%23d4d4d4\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg%3e")',
      }}
    >
      {cards.map((c) => (
        <Card
          key={c.id}
          {...c}
          cards={cards}
          setCards={setCards}
        />
      ))}
    </div>
  );
};

/** ───────────────────────────────────────────────
 *  2. Card (child)
 * ─────────────────────────────────────────────── */
const Card: FC<CardProps> = ({ id, url, cards, setCards }) => {
  const x         = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity   = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront  = id === cards[cards.length - 1]?.id;
  const rotate   = useTransform(
    () => `${rotateRaw.get() + (isFront ? 0 : id % 2 ? 6 : -6)}deg`
  );

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <motion.img
      src={url}
      alt={`card-${id}`}
      draggable={false}   /* disable native drag */
      loading="lazy"
      className="h-96 w-72 origin-bottom rounded-lg bg-white object-cover select-none hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow:   1,
        gridColumn:1,
        zIndex:    id,    /* ensure proper stack order */
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.4)"
          : undefined,
      }}
      animate={{ scale: isFront ? 1 : 0.98 }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: -200, right: 200 }} /* allow movement */
      onDragEnd={handleDragEnd}
    />
  );
};

export default SwipeCards;
