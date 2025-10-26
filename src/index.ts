import { Env } from "./env";
import { handleChat } from "./routes/chat";
import { handleModelViewer } from "./routes/modelviewer";

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/api/chat")) {
      return handleChat(req, env);
    }

    if (url.pathname.startsWith("/modelviewer")) {
      return handleModelViewer(req, env);
    }

    // Serve static assets
    return env.ASSETS.fetch(req);
  }
};
