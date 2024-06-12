declare global {
  interface Global {
    sseResponse: Response & { write: (data: string) => void };
  }
}

declare const global: Global;
