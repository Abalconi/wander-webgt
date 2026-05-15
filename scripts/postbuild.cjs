const fs = require('fs');
const path = require('path');

const clientDir = 'dist/client';
const serverDir = 'dist/server';
const serverFile = path.join(serverDir, 'server.js');

if (!fs.existsSync(serverFile)) {
  console.log('No server.js found');
  process.exit(0);
}

// Copy server.js -> _worker_original.js
fs.copyFileSync(serverFile, path.join(clientDir, '_worker_original.js'));

// Copy server assets -> client assets
const serverAssets = path.join(serverDir, 'assets');
const clientAssets = path.join(clientDir, 'assets');

if (fs.existsSync(serverAssets)) {
  if (!fs.existsSync(clientAssets)) {
    fs.mkdirSync(clientAssets, { recursive: true });
  }
  fs.readdirSync(serverAssets).forEach(f => {
    const src = path.join(serverAssets, f);
    let content = fs.readFileSync(src, 'utf8');
    // Fix imports: ../server.js -> ../_worker_original.js
    content = content.replace(/\.\.\/server\.js/g, '../_worker_original.js');
    fs.writeFileSync(path.join(clientAssets, f), content);
  });
  console.log('Assets copied and fixed!');
}

// Create wrapper _worker.js that intercepts sitemap and robots
const wrapper = `import originalWorker from "./_worker_original.js";

const SITEMAP = \\\`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Home -->
  <url>
    <loc>https://wandergt.com/</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en"/>
  </url>
  <url>
    <loc>https://wandergt.com/en</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en"/>
  </url>

  <!-- Destinos Index -->
  <url>
    <loc>https://wandergt.com/destinos</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/destinos</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos"/>
  </url>

  <!-- Ofertas -->
  <url>
    <loc>https://wandergt.com/ofertas</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/ofertas"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/ofertas"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/ofertas</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/ofertas"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/ofertas"/>
  </url>

  <!-- Guía del Viajero -->
  <url>
    <loc>https://wandergt.com/guia-viajero</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/guia-viajero"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/guia-viajero"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/guia-viajero</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/guia-viajero"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/guia-viajero"/>
  </url>

  <!-- Términos -->
  <url>
    <loc>https://wandergt.com/terminos-condiciones</loc>
  </url>

  <!-- Destinos Específicos -->
  <url>
    <loc>https://wandergt.com/destinos/punta-cana</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/punta-cana"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/punta-cana"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/destinos/punta-cana</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/punta-cana"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/punta-cana"/>
  </url>

  <url>
    <loc>https://wandergt.com/destinos/cancun</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/cancun"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/cancun"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/destinos/cancun</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/cancun"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/cancun"/>
  </url>

  <url>
    <loc>https://wandergt.com/destinos/curazao</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/curazao"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/curazao"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/destinos/curazao</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/curazao"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/curazao"/>
  </url>

  <url>
    <loc>https://wandergt.com/destinos/aruba</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/aruba"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/aruba"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/destinos/aruba</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/aruba"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/aruba"/>
  </url>

  <url>
    <loc>https://wandergt.com/destinos/rio-de-janeiro</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/rio-de-janeiro"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/rio-de-janeiro"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/destinos/rio-de-janeiro</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/rio-de-janeiro"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/rio-de-janeiro"/>
  </url>

  <url>
    <loc>https://wandergt.com/destinos/cartagena</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/cartagena"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/cartagena"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/destinos/cartagena</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/cartagena"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/cartagena"/>
  </url>

  <url>
    <loc>https://wandergt.com/destinos/mexico-basilica</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/mexico-basilica"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/mexico-basilica"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/destinos/mexico-basilica</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/mexico-basilica"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/mexico-basilica"/>
  </url>

  <url>
    <loc>https://wandergt.com/destinos/isla-mucura</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/isla-mucura"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/isla-mucura"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/destinos/isla-mucura</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/isla-mucura"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/isla-mucura"/>
  </url>

  <url>
    <loc>https://wandergt.com/destinos/peten</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/peten"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/peten"/>
  </url>
  <url>
    <loc>https://wandergt.com/en/destinos/peten</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://wandergt.com/destinos/peten"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://wandergt.com/en/destinos/peten"/>
  </url>
</urlset>\\\`;

const ROBOTS = \\\`User-agent: *
Allow: /

Sitemap: https://wandergt.com/sitemap.xml
\\\`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/sitemap.xml") {
      return new Response(SITEMAP, {
        headers: { "Content-Type": "application/xml" },
      });
    }
    if (url.pathname === "/robots.txt") {
      return new Response(ROBOTS, {
        headers: { "Content-Type": "text/plain" },
      });
    }
    return originalWorker.fetch(request, env, ctx);
  },
};
`;

fs.writeFileSync(path.join(clientDir, '_worker.js'), wrapper);
console.log('Wrapper _worker.js created!');

// Fix wrangler.json
const wranglerPath = path.join(clientDir, 'wrangler.json');
if (fs.existsSync(wranglerPath)) {
  const c = JSON.parse(fs.readFileSync(wranglerPath, 'utf8'));
  c.main = '_worker.js';
  delete c.triggers;
  fs.writeFileSync(wranglerPath, JSON.stringify(c, null, 2));
  console.log('Fixed!');
} else {
  console.log('No wrangler.json found in dist/client');
}
