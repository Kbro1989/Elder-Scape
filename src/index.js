import { HfInferenceEndpoint } from '@huggingface/inference';

export interface Env {
  HF_API_TOKEN: string;
  AI_MEMORY: KVNamespace;
  DB: D1Database;
}

export async function onRequestPost({ request, env }: { request: Request, env: Env }) {
    try {
        const { prompt, sessionId } = await request.json();

        // Retrieve previous conversation context
        const previous = await env.AI_MEMORY.get(sessionId) || "";
        const context = previous + "\n" + prompt;

        // Initialize Hugging Face inference endpoint
        const hf = new HfInferenceEndpoint(
            "https://gateway.ai.cloudflare.com/v1/6872653edcee9c791787c1b783173793/pick-of-gods/huggingface/gpt2",
            env.HF_API_TOKEN
        );

        // Generate AI response
        const aiResponse = await hf.text({
            inputs: context,
            parameters: { max_new_tokens: 256 }
        });

        // Update conversation context in KV storage
        await env.AI_MEMORY.put(sessionId, context + "\n" + aiResponse);

        return new Response(JSON.stringify({ output: aiResponse }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
