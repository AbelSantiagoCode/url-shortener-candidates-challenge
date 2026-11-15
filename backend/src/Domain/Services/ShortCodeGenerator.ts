import { injectable } from "tsyringe";
import { ShortCode } from "../ValueObjects/ShortCode.js";

@injectable()
export class ShortCodeGenerator {
  generate(): string { return ShortCode.generate().value; }
}
