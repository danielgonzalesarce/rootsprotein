import { ChapterLugar } from "@/components/home/ChapterLugar";
import { ChapterMasPedidos } from "@/components/home/ChapterMasPedidos";
import { ChapterPorQue } from "@/components/home/ChapterPorQue";
import { ChapterRaices } from "@/components/home/ChapterRaices";
import { ChapterResenas } from "@/components/home/ChapterResenas";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { JsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <main id="contenido">
      <Hero />
      <ChapterMasPedidos />
      <ChapterPorQue />
      <ChapterResenas />
      <ChapterRaices />
      <ChapterLugar />
      <Faq />
      <JsonLd />
    </main>
  );
}
