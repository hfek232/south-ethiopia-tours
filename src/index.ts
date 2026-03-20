import { serve } from "bun";
import indexHtml from "./index.html" with { type: "text" };

const server = serve({
  port: 3000,

  async fetch(req) {
    const url = new URL(req.url);

    // 1. API Proxy
    if (url.pathname === "/api/tours") {
      try {
        const wpUrl = "https://southethiopiatours.com/wp-json/wp/v2/posts?_embed&per_page=12";
        const wpResponse = await fetch(wpUrl);
        const posts: any[] = await wpResponse.json();
        const tours = posts.map((post) => ({
          title: post.title.rendered.replace(/&#8211;/g, "–").replace(/&#038;/g, "&"),
          category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Tour",
          image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://images.unsplash.com/photo-1523805081730-6144a778a9c0?q=80&w=800",
          description: post.excerpt.rendered.replace(/<[^>]*>?/gm, "").substring(0, 120).trim() + "...",
          link: post.link,
        }));
        return Response.json({ tours });
      } catch (err) {
        return Response.json({ tours: [] }, { status: 500 });
      }
    }

    // 2. Serve Frontend Assets (Fixes the 404 for frontend.tsx)
    const filePath = "." + url.pathname;
    const file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }

    // 3. Serve the HTML at root
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(indexHtml, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Server running at http://localhost:${server.port}`);