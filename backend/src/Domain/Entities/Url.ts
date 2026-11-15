import { DomainError } from "../Errors/DomainError.js";
import { OriginalUrl } from "../ValueObjects/OriginalUrl.js";
import { ShortCode } from "../ValueObjects/ShortCode.js";

export interface UrlProps { id?: bigint; originalUrl: string; shortCode: string; clickCount?: number; createdAt?: Date; }
export class Url {
  private constructor(
    readonly originalUrl: OriginalUrl,
    readonly shortCode: ShortCode,
    readonly id?: bigint,
    readonly clickCount = 0,
    readonly createdAt?: Date,
  ) {}
  static create(props: UrlProps): Url {
    if (props.clickCount !== undefined && props.clickCount < 0) throw new DomainError("Click count cannot be negative.");
    return new Url(OriginalUrl.create(props.originalUrl), ShortCode.create(props.shortCode), props.id, props.clickCount, props.createdAt);
  }
}
