import { createCallerFactory, mergeRouters, router } from '../trpc';
import { networksRouter } from './http/networks';
import { httpTokenRoutes } from '@/server/routers/http/tokens';
import { websocketTokenRoutes } from '@/server/routers/websockets/tokens';

export const appRouter = router({
  networks: networksRouter,
  tokens: mergeRouters(httpTokenRoutes, websocketTokenRoutes),
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
