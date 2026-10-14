// URL of an endpoint of the mgrim-portal REST API. Server only: PORTAL_API_URL is not
// exposed to the browser.
export function portalUrl(path: string) {
  const apiUrl = process.env.PORTAL_API_URL;
  if (!apiUrl) {
    throw new Error(
      "Missing PORTAL_API_URL. Copy .env.example to .env.local and fill it in."
    );
  }
  return `${apiUrl.replace(/\/$/, "")}${path}`;
}
