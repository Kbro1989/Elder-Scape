export async function handleModelViewer(req: Request, env: any) {
  const html = await env.ASSETS.fetch("/webviewer.html");
  return new Response(html.body, { headers: { "Content-Type": "text/html" } });
}
