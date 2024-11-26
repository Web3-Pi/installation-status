import { handleApiRequest } from "./api";
import { NotFoundError } from "./error";
import { handleStaticRequest } from "./static";

const server = Bun.serve({
  port: Bun.env.PORT ?? 3000,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname.startsWith("/api/")) {
      const res = await handleApiRequest(req);
      res.headers.set("Content-Type", "application/json");
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }
    return handleStaticRequest(req);
  },
  error(error) {
    if (error instanceof NotFoundError) {
      return new Response(error.message, {
        status: 404,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }
    console.error(error);
    return new Response(error.message, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
});
if (!Bun.env.PORT) {
  console.log("Port unspecified, using 3000");
}
console.log(`Server listening on http://localhost:${server.port} ...`);
