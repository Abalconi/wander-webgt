import { createFileRoute } from "@tanstack/react-router";
import { ForceLang } from "@/components/ForceLang";
import { Destinos } from "./destinos.index";

export const Route = createFileRoute("/en/destinos/")({
  head: () => ({
    meta: [
      { title: "Destinations | Wanderlux" },
      { name: "description", content: "Explore our all-inclusive destinations in the Caribbean and Latin America." },
    ],
  }),
  component: () => (
    <>
      <ForceLang lang="en" />
      <Destinos />
    </>
  ),
});
