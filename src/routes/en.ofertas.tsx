import { createFileRoute } from "@tanstack/react-router";
import { ForceLang } from "@/components/ForceLang";
import { Ofertas } from "./ofertas";

export const Route = createFileRoute("/en/ofertas")({
  head: () => ({
    meta: [
      { title: "Deals | Wanderlux" },
      { name: "description", content: "Limited-time deals on all-inclusive vacation packages." },
    ],
  }),
  component: () => (
    <>
      <ForceLang lang="en" />
      <Ofertas />
    </>
  ),
});
