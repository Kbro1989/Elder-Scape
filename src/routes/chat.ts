export async function handleChat(req: Request, env: any, hf: any) {
  const { message, sessionId } = await req.json();

  // Get previous session memory
  const sessionData = await env.AI_MEMORY.get(`session_${sessionId}`, "json") || { context: [] };

  // Append new message
  sessionData.context.push({ role: "user", content: message });

  // Call HuggingFace GPT2 via CF Gateway
  const response = await hf.generate({
    inputs: sessionData.context.map((m: any) => m.content).join("\n"),
    parameters: { max_new_tokens: 150 }
  });

  // Save memory
  sessionData.context.push({ role: "assistant", content: response.generated_text });
  await env.AI_MEMORY.put(`session_${sessionId}`, JSON.stringify(sessionData));

  return new Response(JSON.stringify({ reply: response.generated_text }), {
    headers: { "Content-Type": "application/json" }
  });
}
