"use client";

import React, { useState, type FC } from "react";
import { motion } from "framer-motion";

/*********************************************************************
 * PromptCards – standalone flip‑card grid
 * --------------------------------------------------------
 * • Accepts an array of { id, front, back } prompts.
 * • Click a card → flips to reveal the custom `back` message.
 * • Mobile‑first responsive grid (1 → 3 cols).
 *********************************************************************/

export interface Prompt {
  id: number;
  front: string;
  back: string;
}

export interface PromptCardsProps {
  prompts?: Prompt[];
}

const defaultPrompts: Prompt[] = [
  { id: 1, front: "When you miss me?", back: "Text me ❤️" },
  { id: 2, front: "Do you hate me?", back: " No jaanu I love you 💖" },
  { id: 3, front: "When you're angry at me?", back: "jaaanu this only temporay i will always love you with even with antics 🫶" },
  { id: 4, front: "When you want to hug me?", back: "I will always be there for you jaanu 🤗" },
  { id: 5, front: "When you want to kiss me?", back: "I will always be there for you jaanu 😘" },
  { id: 6, front: "When you want to cuddle me?", back: "I will always be there for you jaanu 🥰" },
  { id: 7, front: "When you want to go on a date with me?", back: "I will always be there for you jaanu 🍽️" },
  { id: 8, front: "When you want to watch a movie with me?", back: "I will always be there for you jaanu 🎬" },
  { id: 9, front: "When you want to go for a walk with me?", back: "I will always be there for you jaanu 🚶‍♂️" }
];

const PromptCards: FC<PromptCardsProps> = ({ prompts = defaultPrompts }) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {prompts.map((p) => (
        <motion.div
          key={p.id}
          onClick={() => setOpen(open === p.id ? null : p.id)}
          className="relative h-40 perspective cursor-pointer select-none"
        >
          {/* front */}
          <motion.div
            initial={false}
            animate={{ rotateY: open === p.id ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center rounded-xl bg-pink-100 text-pink-700 font-semibold text-lg backface-hidden"
          >
            {p.front}
          </motion.div>

          {/* back */}
          <motion.div
            initial={false}
            animate={{ rotateY: open === p.id ? 0 : -180 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center rounded-xl bg-pink-500 text-white font-bold text-xl backface-hidden rotateY-180 px-2 text-center"
          >
            {p.back}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default PromptCards;
