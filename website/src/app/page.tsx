import DailyRevealGrid from "./components/DailyRevealGrid";
import PromptCards      from "./components/PromptCards";

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
    </main>
  );
}
