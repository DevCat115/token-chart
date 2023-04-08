import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { apiHostUrlPrefix } from '@/lib/constants';
import { AppRouter } from '@/server/routers';
import superjson from 'superjson';

export const trpcVanilla = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: apiHostUrlPrefix,
      transformer: superjson
    }),
  ],
});