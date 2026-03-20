import { serve } from "bun";
import { join } from "path";

const server = serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // 1. WordPress Headless API Proxy
    if (url.pathname === "/api/tours") {
      try {
        const wpResponse = await fetch("https://southethiopiatours.com/wp-json/wp/v2/posts?_embed&per_page=12");
        const posts = await wpResponse.json();
        const tours = posts.map((post: any) => ({
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

    // 2. YOUR TRANSPILER BLOCK (Directly integrated)
    if (url.pathname.endsWith(".tsx") || url.pathname.endsWith(".ts")) {
      const filePath = join(process.cwd(), url.pathname);
      const file = Bun.file(filePath);

      if (await file.exists()) {
        const result = await Bun.build({
          entrypoints: [filePath],
          target: "browser",
          format: "esm",
          splitting: false,
        });

        return new Response(result.outputs[0], {
          headers: { "Content-Type": "application/javascript" },
        });
      }
    }

    // 3. Serve index.html from root
    if (url.pathname === "/" || url.pathname === "/index.html") {
      const htmlFile = Bun.file("./index.html");
      if (await htmlFile.exists()) {
        return new Response(htmlFile, {
          headers: { "Content-Type": "text/html" },
        });
      }
    }

    // 4. Static Fallback (CSS, images)
    const staticFile = Bun.file("." + url.pathname);
    if (await staticFile.exists()) {
      return new Response(staticFile);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Server with Bun.build running at http://localhost:${server.port}`);
