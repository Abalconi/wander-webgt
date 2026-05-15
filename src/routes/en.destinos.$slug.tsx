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
      links: [
        { rel: "canonical", href: `https://wandergt.com/en/destinos/${params.slug}` },
        { rel: "alternate", hreflang: "es", href: `https://wandergt.com/destinos/${params.slug}` },
        { rel: "alternate", hreflang: "en", href: `https://wandergt.com/en/destinos/${params.slug}` },
        { rel: "alternate", hreflang: "x-default", href: `https://wandergt.com/destinos/${params.slug}` },
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
