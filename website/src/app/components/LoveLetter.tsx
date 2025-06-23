"use client";

import React, { type FC } from "react";
import { FiHeart } from "react-icons/fi";

/**
 * LoveLetter – displays a developer-provided letter in a heart-decorated box.
 */
export interface LoveLetterProps {
  /** The content of the letter as a plain string or JSX */
  letter: React.ReactNode;
}

const LoveLetter: FC<LoveLetterProps> = ({ letter }) => {
  return (
    <section className="bg-pink-50 py-16">
      <div className="mx-auto w-full max-w-4xl px-4">
        {/* Top heart banner */}
        <div className="flex justify-center mb-4">
          {[...Array(7)].map((_, i) => (
            <FiHeart key={i} className="text-pink-500 mx-1 text-2xl animate-pulse" />
          ))}
        </div>

        <h2 className="mb-6 text-center text-3xl font-extrabold text-pink-600">
          A Letter From Me To You
        </h2>

        <div className="relative">
          {/* Decorative hearts overlay behind text */}
          <div className="pointer-events-none absolute inset-0 flex flex-wrap p-2">
            {[...Array(20)].map((_, i) => (
              <FiHeart
                key={i}
                className="text-pink-200 opacity-50 m-1 rotate-45"
              />
            ))}
          </div>

          {/* Static letter content */}
          <div className="relative bg-white p-10 border-4 border-pink-300 rounded-2xl shadow-md text-gray-800 whitespace-pre-wrap">
            {letter}
          </div>
        </div>

        {/* Bottom heart banner */}
        <div className="flex justify-center mt-4">
          {[...Array(7)].map((_, i) => (
            <FiHeart key={i} className="text-pink-500 mx-1 text-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;
