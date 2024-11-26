export function handleStaticRequest(req: Request) {
  const url = new URL(req.url);
  // index.html
  if (url.pathname.endsWith("/") || url.pathname.endsWith("/index.html")) {
    return new Response(Bun.file(import.meta.dir + "/dist/index.html"));
  }
  // other assets
  return new Response(Bun.file(import.meta.dir + "/dist" + url.pathname));
}
