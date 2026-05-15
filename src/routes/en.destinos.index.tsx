import { createFileRoute } from "@tanstack/react-router";
import { ForceLang } from "@/components/ForceLang";
import { Destinos } from "./destinos.index";

export const Route = createFileRoute("/en/destinos/")({
  head: () => ({
    meta: [
      { title: "Destinations | Wanderlux" },
      { name: "description", content: "Explore our all-inclusive destinations in the Caribbean and Latin America." },
    ],
    links: [
      { rel: "canonical", href: "https://wandergt.com/en/destinos" },
      { rel: "alternate", hreflang: "es", href: "https://wandergt.com/destinos" },
      { rel: "alternate", hreflang: "en", href: "https://wandergt.com/en/destinos" },
      { rel: "alternate", hreflang: "x-default", href: "https://wandergt.com/destinos" },
    ],
  }),
  component: () => (
    <>
      <ForceLang lang="en" />
      <Destinos />
    </>
  ),
});
