export function sanitizeUsername(name: string) {
  return name.replace(/[^\w\- ]/g, "");
}
