import { createFileRoute } from "@tanstack/react-router";
import { ForceLang } from "@/components/ForceLang";
import { Ofertas } from "./ofertas";

export const Route = createFileRoute("/en/ofertas")({
  head: () => ({
    meta: [
      { title: "Deals | Wanderlux" },
      { name: "description", content: "Limited-time deals on all-inclusive vacation packages." },
    ],
    links: [
      { rel: "canonical", href: "https://wandergt.com/en/ofertas" },
      { rel: "alternate", hreflang: "es", href: "https://wandergt.com/ofertas" },
      { rel: "alternate", hreflang: "en", href: "https://wandergt.com/en/ofertas" },
      { rel: "alternate", hreflang: "x-default", href: "https://wandergt.com/ofertas" },
    ],
  }),
  component: () => (
    <>
      <ForceLang lang="en" />
      <Ofertas />
    </>
  ),
});
