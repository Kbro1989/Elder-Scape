import { askAI } from "../ai";

export async function handleChat(req: Request, env: any) {
  try {
    const { prompt } = await req.json();
    const result = await askAI(env, prompt);
    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
