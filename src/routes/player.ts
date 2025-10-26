export async function handlePlayer(req: Request, env: any) {
  const url = new URL(req.url);
  const username = url.pathname.split("/player/")[1] || "guest";

  // Example: fetch player info from D1
  const result = await env.DB.prepare("SELECT * FROM players WHERE username = ?")
    .bind(username)
    .all();

  return new Response(JSON.stringify(result.results), {
    headers: { "Content-Type": "application/json" },
  });
}
