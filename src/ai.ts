import { HfInferenceEndpoint } from "@huggingface/inference";

export function createAIClient(token: string) {
  return new HfInferenceEndpoint(
    "https://gateway.ai.cloudflare.com/v1/6872653edcee9c791787c1b783173793/pick-of-gods/huggingface/gpt2",
    token
  );
}

export async function chatAI(client: HfInferenceEndpoint, prompt: string) {
  return await client.text({ inputs: prompt });
}
