export function cleanPath(value: string) {
  if (!value || value === "/" || value === "index.html" || value === "/index.html") return "/";
  const withoutDomain = value.replace(/^https?:\/\/www\.stepcable\.com\/?/i, "");
  const normalized = withoutDomain.startsWith("/") ? withoutDomain : `/${withoutDomain}`;
  return normalized.replace(/\/index\.html$/i, "/").replace(/\.html$/i, "");
}

export function cleanSlug(value: string) {
  if (!value || value === "/" || value === "index.html") return "";
  return cleanPath(value).replace(/^\/+/, "").replace(/\/+$/, "");
}
