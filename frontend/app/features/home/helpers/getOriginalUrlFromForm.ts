export function getOriginalUrlFromForm(formData: FormData): string | null {
  const value = formData.get("url");
  if (typeof value !== "string") return null;
  const originalUrl = value.trim();
  return originalUrl.length > 0 ? originalUrl : null;
}
