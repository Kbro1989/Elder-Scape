import { createAIClient, chatAI } from "./ai";

export interface Env {
  AI: any;
  HF_GPT2: any;
  DB: D1Database;
  AI_MEMORY: KVNamespace;
  ASSETS: Fetcher;
  HF_API_TOKEN: string;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    // Serve static assets
    if (url.pathname.startsWith("/public/") || url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
      return env.ASSETS.fetch(request);
    }

    // AI chat
    if (url.pathname === "/api/chat") {
      const { message } = await request.json();
      const hf = createAIClient(env.HF_API_TOKEN);
      const reply = await chatAI(hf, message);
      return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json" } });
    }

    // Player endpoints
    if (url.pathname.startsWith("/api/player")) {
      const parts = url.pathname.split("/");
      const username = parts[3]; // /api/player/:username
      const res = await env.DB.prepare("SELECT * FROM players WHERE username = ?")
        .bind(username)
        .all();
      return new Response(JSON.stringify(res.results), { headers: { "Content-Type": "application/json" } });
    }

    // Default: serve index.html
    return env.ASSETS.fetch(new Request("/public/index.html"));
  },
};
