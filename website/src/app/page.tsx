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
      
            <LoveLetter letter="You are the light of my life. ❤️ the moment we met I could instantly tell you were different for other girls. I was capviated by how 
            how unYou were for the second I met you the same. I prayed every single day “ya allah allow my ambitions to come true”. Underneath all that I was praying for my wife but I was not directly asking for it. But what he did instead gave something even better than what I had dreamed of. You turn my bad mood into a good mood. You made every waking moment interesting whilst your chaotic geet behaviour lowk scares me but I love it. You turned life for the better. I was never this ambitious until I met you. You've kickstarted my dormant ambition as I want to provide you with the future you deserve. Honestly speaking I am also very nervous to meet your parents. But every moment I spend behind the screen drives me crazy I want see you in person. I love and respect the person you've grown into. I cannot wait to meet you in real life then met your parents HOPEFULLY I am able to make a good enough impression so we finally officially end LDR. my jaaaanu my babyiee meri jaan. I love you and i hope this website is testament to that " />
        </div>
      </section>
    </main>
  );
}
