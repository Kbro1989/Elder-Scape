export async function getPlayer(username: string, DB: D1Database) {
  const res = await DB.prepare("SELECT * FROM players WHERE username = ?")
    .bind(username)
    .all();
  return res.results[0] || null;
}
