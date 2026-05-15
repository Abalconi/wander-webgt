import { createFileRoute } from "@tanstack/react-router";
import { ForceLang } from "@/components/ForceLang";
import { Index } from "./index";

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: [
      { title: "Wanderlux | Travel Agency Specializing in All-Inclusive" },
      { name: "description", content: "Travel agency in Guatemala specializing in all-inclusive packages. Punta Cana, Cancún, Aruba and more." },
      { property: "og:title", content: "Wanderlux | Travel Agency" },
      { property: "og:description", content: "All-inclusive packages to the best destinations in the Caribbean and Latin America." },
    ],
    links: [
      { rel: "canonical", href: "https://wandergt.com/en" },
      { rel: "alternate", hreflang: "es", href: "https://wandergt.com/" },
      { rel: "alternate", hreflang: "en", href: "https://wandergt.com/en" },
      { rel: "alternate", hreflang: "x-default", href: "https://wandergt.com/" },
    ],
  }),
  component: () => (
    <>
      <ForceLang lang="en" />
      <Index />
    </>
  ),
});
