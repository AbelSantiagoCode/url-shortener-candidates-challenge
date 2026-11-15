import type { ErrorRequestHandler } from "express";
import { DomainError } from "../../Domain/Errors/DomainError.js";
import { NotFoundError } from "../../Application/Errors/NotFoundError.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof DomainError) { res.status(400).json({ error: error.message }); return; }
  if (error instanceof NotFoundError) { res.status(404).json({ error: error.message }); return; }
  if (error instanceof SyntaxError) { res.status(400).json({ error: "Malformed JSON body." }); return; }
  console.error(error);
  res.status(500).json({ error: "Internal server error." });
};
