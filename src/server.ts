import handler from "@tanstack/react-start/server-entry";
import { destinations } from "./data/destinations";

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);

    // Interceptar /sitemap.xml
    if (url.pathname === "/sitemap.xml") {
      const sitemap = generateSitemap(destinations);
      return new Response(sitemap, {
        headers: { "Content-Type": "application/xml" },
      });
    }

    // Interceptar /robots.txt
    if (url.pathname === "/robots.txt") {
      const robots = `# https://www.robotstxt.org/robotstxt.html

User-agent: *
Allow: /

Sitemap: https://wandergt.com/sitemap.xml
`;
      return new Response(robots, {
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Delegar todo lo demás al handler de TanStack Start
    return handler.fetch(request, env, ctx);
  },
};

function generateSitemap(destinations: any[]) {
  const baseUrl = "https://wandergt.com";
  const staticPages = [
    "",
    "/destinos",
    "/ofertas",
    "/guia-viajero",
    "/terminos-condiciones",
  ];

  const staticUrls = staticPages.map((page) => {
    const esUrl = `${baseUrl}${page}`;
    const enUrl = page === "/terminos-condiciones" ? null : `${baseUrl}/en${page}`;
    
    let items = `
  <url>
    <loc>${esUrl}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>
    ${enUrl ? `<xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>` : ''}
    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;

    if (enUrl) {
      items += `
  <url>
    <loc>${enUrl}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>
    <priority>0.7</priority>
  </url>`;
    }
    return items;
  }).join("");

  const destinationUrls = destinations.map((dest) => {
    const esUrl = `${baseUrl}/destinos/${dest.slug}`;
    const enUrl = `${baseUrl}/en/destinos/${dest.slug}`;
    
    return `
  <url>
    <loc>${esUrl}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${enUrl}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>
    <priority>0.7</priority>
  </url>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${staticUrls}
  ${destinationUrls}
</urlset>`;
}
