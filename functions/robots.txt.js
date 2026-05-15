export function onRequest() {
  const robots = `# https://www.robotstxt.org/robotstxt.html

User-agent: *
Allow: /

Sitemap: https://wandergt.com/sitemap.xml
`;
  return new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
}
