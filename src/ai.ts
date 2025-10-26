import { HfInferenceEndpoint } from "@huggingface/inference";

export function createHfClient(env: any) {
  return new HfInferenceEndpoint(
    "https://gateway.ai.cloudflare.com/v1/6872653edcee9c791787c1b783173793/pick-of-gods/huggingface/gpt2",
    env.HF_API_TOKEN
  );
}

export async function askAI(env: any, prompt: string) {
  const client = createHfClient(env);
  const response = await client.textGeneration({
    inputs: prompt,
    parameters: { max_new_tokens: 150 }
  });
  return response;
}
