export interface Env {
  HF_API_TOKEN: string;  // Wrangler injects this securely
  AI_MEMORY: KVNamespace;
  DB: D1Database;
  ASSETS: R2Bucket;
}

const hf = new HfInferenceEndpoint(
  "https://gateway.ai.cloudflare.com/v1/6872653edcee9c791787c1b783173793/pick-of-gods/huggingface/gpt2",
  env.HF_API_TOKEN
);
