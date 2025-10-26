export async function handleRequest(req: Request, env: any) {
  // Serve webviewer page
  const html = await env.ASSETS.get('webviewer.js');
  const body = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>ElderScape Model Viewer</title>
      <script src="/webviewer.js" defer></script>
      <link rel="stylesheet" href="/index.css"/>
    </head>
    <body>
      <div id="rsmv_app"></div>
    </body>
  </html>`;
  return new Response(body, { headers: { "Content-Type": "text/html" } });
}
