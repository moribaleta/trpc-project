import * as z from 'zod';

import { publicProcedure, router } from './trpc';

/**
 * register your api here
 */
export const appRouter = router({
  getUsers: publicProcedure.output(z.array(z.string())).query(async () => {
    //return await getUsers();
    const response = await fetch('http://localhost:3001/getUsers', {
      method: 'GET',
    }).then((res) => res.json());

    console.log('get', response);

    return response;
  }),

  createUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ input: { userId } }) => {
      //return await createUser(userId);
      const response = await fetch('http://localhost:3001/createUser', {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Connection: 'keep-alive',
          Accept: '*',
        },
        method: 'POST',
        body: JSON.stringify({ userId }),
      }).then((res) => res.json());
      console.log(response);
      return response;
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
