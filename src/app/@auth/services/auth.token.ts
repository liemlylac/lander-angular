export class AuthToken {
  protected payload: any = null;

  constructor(
    protected name: string,
    protected value: any,
    protected createdAt: Date
  ) {
  }

  getValue(): string {
    return undefined;
  }

  getCreatedAt(): Date {
    return undefined;
  }

  isValid(): boolean {
    return undefined;
  }

  toString(): string {
    return undefined;
  }

  getName(): string {
    return this.name;
  }

  getPayload(): any {
    return this.payload;
  }
}
