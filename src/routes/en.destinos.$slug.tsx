import { createFileRoute } from "@tanstack/react-router";
import { ForceLang } from "@/components/ForceLang";
import { DestinoDetalle } from "./destinos.$slug";
import { getDestination } from "@/data/destinations";

export const Route = createFileRoute("/en/destinos/$slug")({
  head: ({ params }) => {
    const dest = getDestination(params.slug);
    return {
      meta: [
        { title: dest ? `${dest.seoTitleEn} | Wanderlux` : "Destination | Wanderlux" },
        { name: "description", content: dest?.descriptionEn ?? "" },
        { property: "og:title", content: dest?.seoTitleEn ?? "Wanderlux" },
        { property: "og:description", content: dest?.descriptionEn ?? "" },
        { property: "og:image", content: dest?.image ?? "" },
      ],
    };
  },
  component: () => (
    <>
      <ForceLang lang="en" />
      <DestinoDetalle />
    </>
  ),
});
