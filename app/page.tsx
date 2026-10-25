import { ChapterAntojo } from "@/components/home/ChapterAntojo";
import { ChapterHistoria } from "@/components/home/ChapterHistoria";
import { ChapterLugar } from "@/components/home/ChapterLugar";
import { ChapterPostEntreno } from "@/components/home/ChapterPostEntreno";
import { ChapterPreEntreno } from "@/components/home/ChapterPreEntreno";
import { ChapterRincon } from "@/components/home/ChapterRincon";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { MacroLabel } from "@/components/home/MacroLabel";
import { JsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <main id="contenido">
      <Hero />
      <ChapterPreEntreno />
      <ChapterPostEntreno />
      <ChapterAntojo />
      <MacroLabel />
      <ChapterRincon />
      <ChapterHistoria />
      <ChapterLugar />
      <Faq />
      <JsonLd />
    </main>
  );
}
