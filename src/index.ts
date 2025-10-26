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
      return handleModelViewer(req, env);import { HfInferenceEndpoint } from '@huggingface/inference';
import { handleRequest } from './routes/modelviewer';
import { handlePlayer } from './routes/player';
import { handleChat } from './routes/chat';

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);

    // AI Gateway (HuggingFace)
    const hf = new HfInferenceEndpoint(
      "https://gateway.ai.cloudflare.com/v1/6872653edcee9c791787c1b783173793/pick-of-gods/huggingface/gpt2",
      env.HF_API_TOKEN
    );

    // Routes
    if (url.pathname.startsWith("/modelviewer")) {
      return handleRequest(request, env);
    }

    if (url.pathname.startsWith("/player")) {
      return handlePlayer(request, env);
    }

    if (url.pathname.startsWith("/chat")) {
      return handleChat(request, env, hf);
    }

    // Static assets
    try {
      return await env.ASSETS.fetch(request);
    } catch {
      return new Response("Not found", { status: 404 });
    }
  },
};

    }

    // Serve static assets
    return env.ASSETS.fetch(req);
  }
};
