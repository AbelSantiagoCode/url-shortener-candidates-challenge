import { DomainError } from "../Errors/DomainError.js";

export class OriginalUrl {
  private constructor(readonly value: string) {}
  static create(value: string): OriginalUrl {
    let parsed: URL;
    try { parsed = new URL(value); } catch { throw new DomainError("Enter a valid absolute URL."); }
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new DomainError("Only HTTP and HTTPS URLs are supported.");
    return new OriginalUrl(parsed.toString());
  }
}
