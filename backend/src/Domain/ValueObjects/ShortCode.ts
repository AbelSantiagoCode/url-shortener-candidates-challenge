import { randomInt } from "node:crypto";
import { DomainError } from "../Errors/DomainError.js";

export const BASE62_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export class ShortCode {
  private constructor(readonly value: string) {}
  static generate(length = 7): ShortCode {
    let code = "";
    for (let index = 0; index < length; index += 1) code += BASE62_ALPHABET[randomInt(BASE62_ALPHABET.length)];
    return new ShortCode(code);
  }
  static create(value: string): ShortCode {
    if (!/^[0-9a-zA-Z]{4,16}$/.test(value)) throw new DomainError("Short code must be 4–16 Base62 characters.");
    return new ShortCode(value);
  }
}
