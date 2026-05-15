import { createFileRoute } from "@tanstack/react-router";
import { ForceLang } from "@/components/ForceLang";
import { Guia } from "./guia-viajero";

export const Route = createFileRoute("/en/guia-viajero")({
  head: () => ({
    meta: [
      { title: "Travel Guide | Wanderlux" },
      { name: "description", content: "Tips and recommendations for your next trip." },
    ],
    links: [
      { rel: "canonical", href: "https://wandergt.com/en/guia-viajero" },
      { rel: "alternate", hreflang: "es", href: "https://wandergt.com/guia-viajero" },
      { rel: "alternate", hreflang: "en", href: "https://wandergt.com/en/guia-viajero" },
      { rel: "alternate", hreflang: "x-default", href: "https://wandergt.com/guia-viajero" },
    ],
  }),
  component: () => (
    <>
      <ForceLang lang="en" />
      <Guia />
    </>
  ),
});
