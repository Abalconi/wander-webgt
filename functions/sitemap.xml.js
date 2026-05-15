export function onRequest() {
  const baseUrl = "https://wandergt.com";
  const slugs = [
    "punta-cana",
    "cancun",
    "curazao",
    "aruba",
    "rio-de-janeiro",
    "cartagena",
    "mexico-basilica",
    "isla-mucura",
    "peten"
  ];

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

  const destinationUrls = slugs.map((slug) => {
    const esUrl = `${baseUrl}/destinos/${slug}`;
    const enUrl = `${baseUrl}/en/destinos/${slug}`;
    
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

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${staticUrls}
  ${destinationUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
