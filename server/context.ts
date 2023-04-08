import { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';

export function createContext(opts: CreateHTTPContextOptions | CreateWSSContextFnOptions) {
  return {};
}
export type Context = Awaited<ReturnType<typeof createContext>>;
