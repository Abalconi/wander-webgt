import { createFileRoute } from "@tanstack/react-router";
import { ForceLang } from "@/components/ForceLang";
import { Guia } from "./guia-viajero";

export const Route = createFileRoute("/en/guia-viajero")({
  head: () => ({
    meta: [
      { title: "Travel Guide | Wanderlux" },
      { name: "description", content: "Tips and recommendations for your next trip." },
    ],
  }),
  component: () => (
    <>
      <ForceLang lang="en" />
      <Guia />
    </>
  ),
});
