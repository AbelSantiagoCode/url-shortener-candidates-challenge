export class NotFoundError extends Error {
  constructor(message = "URL not found.") { super(message); this.name = "NotFoundError"; }
}
