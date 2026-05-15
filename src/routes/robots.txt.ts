import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/robots.txt')({
  GET: () => {
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
