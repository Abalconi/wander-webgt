import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/robots.txt')({
  loader: () => {
    const robots = `# https://www.robotstxt.org/robotstxt.html

User-agent: *
Allow: /

Sitemap: https://wandergt.com/sitemap.xml
`;

    return new Response(robots, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  },
});
