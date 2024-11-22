const server = Bun.serve({
  port: Bun.env.PORT ?? 3000,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname.startsWith("/api")) {
      return new Response("Hello!");
    }
    // index.html
    if (url.pathname.endsWith("/") || url.pathname.endsWith("/index.html")) {
      return new Response(Bun.file(import.meta.dir + "/dist/index.html"));
    }
    // other assets
    return new Response(Bun.file(import.meta.dir + "/dist" + url.pathname));
  },
});
if (!Bun.env.PORT) {
  console.log("Port unspecified, using 3000");
}
console.log(`Server listening on http://localhost:${server.port} ...`);
