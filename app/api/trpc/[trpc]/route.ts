import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/routers';
import { apiHostUrlPrefix } from '@/lib/constants';
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: apiHostUrlPrefix,
    req,
    router: appRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };
