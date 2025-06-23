import DailyRevealGrid from "./components/DailyRevealGrid";
import PromptCards      from "./components/PromptCards";
import SwipeCards       from "./components/SwipeCards";
import LoveLetter from "./components/LoveLetter";

export default function Home() {
  return (
    <main className="flex flex-col gap-24 py-10">
      {/* ───────────────  Calendar  ─────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4">
        <DailyRevealGrid />
      </section>

      {/* ───────────────  Prompt cards  ─────────────── */}
      <section className="bg-gradient-to-b from-pink-50 to-white py-16">
        <div className="mx-auto w-full max-w-4xl px-4">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-pink-600">
            Ask Me Anything ❤️
          </h2>
          <PromptCards />
        </div>
      </section>

      {/* ───────────────  Swipe cards  ─────────────── */}
      <section className="bg-neutral-100 py-16">
        <div className="mx-auto w-full max-w-4xl px-4">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-800">
            Swipe Through Memories
          </h2>
          <SwipeCards />
        </div>
      </section>

      {/* ───────────────  Love Letter  ─────────────── */}
      <section className="bg-red-50 py-16">
        <div className="mx-auto w-full max-w-4xl px-4">
          <LoveLetter>
            {`Dear You,

You've captured my heart more than words can say. From the moment we met, I knew you were different. I was captivated by your uniqueness, your spirit, and the way you see the world.

Every day, I thank Allah for bringing you into my life. You've turned my dreams into reality in ways I never expected. You've transformed my life, filling it with color and light. Your presence has awakened a dormant ambition in me, a desire to build a future worthy of you.

I must admit, the thought of meeting your parents makes me nervous. I hope to make a good impression, to show them the depth of my feelings for you. This distance between us, though challenging, has only strengthened my love and respect for you.

I long for the day we no longer have to rely on screens to connect. Until then, know that you are deeply loved and cherished. You are my jaanu, my baby, my everything. I love you.`}
          </LoveLetter>
        </div>
      </section>
    </main>
  );
}
