import { createAPIFileRoute } from '@tanstack/react-start/api';
import { destinations } from '@/data/destinations';

export const APIRoute = createAPIFileRoute('/sitemap.xml')({
  GET: () => {
    const baseUrl = 'https://wandergt.com';
    const staticPages = [
      '',
      '/destinos',
      '/ofertas',
      '/guia-viajero',
      '/terminos-condiciones',
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${staticPages
    .map((page) => {
      const esUrl = `${baseUrl}${page}`;
      const enUrl = page === '/terminos-condiciones' ? null : `${baseUrl}/en${page}`;
      
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
    })
    .join('')}

  ${destinations
    .map((dest) => {
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
    })
    .join('')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  },
});
