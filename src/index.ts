import { HfInferenceEndpoint } from '@huggingface/inference';

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
    if (url.pathname.startsWith("/public/") || url.pathname === "/webviewer.js") {
      return env.ASSETS.fetch(request);
    }

    // AI chat endpoint
    if (url.pathname === "/api/chat") {
      const { message } = await request.json();
      const hf = new HfInferenceEndpoint(
        "https://gateway.ai.cloudflare.com/v1/6872653edcee9c791787c1b783173793/pick-of-gods/huggingface/gpt2",
        env.HF_API_TOKEN
      );
      const reply = await hf.text({ inputs: message });
      return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json" } });
    }

    // Other API routes
    if (url.pathname.startsWith("/api/player")) {
      const name = url.pathname.split("/").pop();
      const res = await env.DB.prepare("SELECT * FROM players WHERE username = ?").bind(name).all();
      return new Response(JSON.stringify(res.results), { headers: { "Content-Type": "application/json" } });
    }

    // Default: serve index.html
    return env.ASSETS.fetch(new Request("/public/index.html"));
  },
};
