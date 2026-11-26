import type { Metadata } from "next";
import { Figtree, Young_Serif } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Header } from "@/components/layout/Header";
import { ProductProvider } from "@/components/menu/ProductModal";
import { site } from "@/data/site";
import { homeMetadata } from "@/lib/seo";
import "./globals.css";

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-young-serif",
});

const figtree = Figtree({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  ...homeMetadata,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "food",
  classification: "Protein bar, cafetería saludable",
  other: {
    "geo.region": "PE-LIM",
    "geo.placename": "Santa Anita, Lima",
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${youngSerif.variable} ${figtree.variable} h-full antialiased`}>
      <body className="min-h-full bg-avena font-sans text-tinta">
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <ProductProvider>
          <Header />
          {children}
          <Footer />
          <FloatingWhatsApp />
          <CartDrawer />
        </ProductProvider>
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
