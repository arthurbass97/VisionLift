// Minimal type declarations for the Cloudflare APIs the Worker uses, so it type-checks
// without adding @cloudflare/workers-types as a dependency.

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

interface D1Result {
  meta: { last_row_id: number; changes: number };
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<D1Result>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface SendEmail {
  send(message: import('cloudflare:email').EmailMessage): Promise<void>;
}

declare module 'cloudflare:email' {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string);
    readonly from: string;
    readonly to: string;
  }
}
