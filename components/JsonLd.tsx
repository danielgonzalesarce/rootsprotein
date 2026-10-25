import { cafeSchema } from "@/lib/schema";

export function JsonLd() {
  const json = JSON.stringify(cafeSchema()).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
