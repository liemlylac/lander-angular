export interface AuthResultOptions {
  success: boolean;
  response?: unknown;
  redirect?: string;
  errors?: string[];
  messages?: string[];
  token?: unknown;
}

export class AuthResult {

  protected messages: string[] = [];
  protected errors: string[] = [];
  protected token: unknown;
  protected success: boolean;
  protected response?: unknown;
  protected redirect?: string;

  constructor(options: AuthResultOptions) {
    this.success = options.success;
    this.response = options.response;
    this.redirect = options.redirect;

    if (options.errors && Array.isArray(options.errors)) {
      this.errors = options.errors;
    }

    if (options.messages && Array.isArray(options.messages)) {
      this.messages = options.messages;
    }
    this.token = options.token ? options.token : null;
  }

  isFailure(): boolean {
    return !this.success;
  }

  getResponse(): unknown {
    return this.response;
  }

  getRedirect(): string {
    return this.redirect;
  }

  getMessages(): string[] {
    return this.messages;
  }

  getErrors(): string[] {
    return this.errors;
  }

  getToken(): unknown {
    return this.token;
  }
}
