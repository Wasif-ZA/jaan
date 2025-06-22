import Image from "next/image";
import DailyRevealGrid from "./DailyRevealGrid";

export default function Home() {
  return (
   
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <DailyRevealGrid />

    </main>
  );
}
