function ensureHttps(url: string): string;
function ensureHttps(url: string | undefined): string | undefined;
function ensureHttps(url: string | undefined): string | undefined {
  return url?.replace("http://", "https://");
}

export { ensureHttps };
