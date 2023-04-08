import { AppRouter } from '@/server/routers';
import { createWSClient, httpLink, loggerLink, splitLink, wsLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { ssrPrepass } from '@trpc/next/ssrPrepass';
import type { inferRouterOutputs } from '@trpc/server';
import superjson from 'superjson';
import { apiHostUrlPrefix, httpApiHostUrl, wsApiHostUrl } from '../constants';

export const trpc = createTRPCNext<AppRouter>({
  ssr: true,
  ssrPrepass,
  config({ ctx }) {
    return {
      abortOnUnmount: true,
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        splitLink({
          condition: (operation) => {
            return operation.type === 'subscription';
          },
          true: wsLink({
            client: createWSClient({
              url: `${wsApiHostUrl}${apiHostUrlPrefix}`,
              retryDelayMs: () => 60000,
              lazy: {
                enabled: true,
                closeMs: 10000,
              },
            }),
            transformer: superjson,
          }),
          false: httpLink({
            url: `${httpApiHostUrl}${apiHostUrlPrefix}`,
            transformer: superjson,
          }),
        }),
      ],
      // Set queries to never get stale
      // to prevent the client from polling data from the server
      queryClientConfig: {
        defaultOptions: { queries: { staleTime: Infinity } },
      },
    };
  },
  transformer: superjson,
});

export type RouterOutputs = inferRouterOutputs<AppRouter>;
