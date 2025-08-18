declare module '@iarna/toml' {
  export interface JsonMap {
    [key: string]: unknown;
  }
  
  export function parse(str: string): JsonMap;
  export function stringify(obj: Record<string, unknown>): string;
}
