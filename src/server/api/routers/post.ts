import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return "ctx.prisma.example.findMany()";
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  createNewPost: adminProcedure
    .input(
      z.object({
        authorId: z.string(),
        title: z.string(),
        image: z.string().nullish(),
        article: z.string(),
      })
    )
    .mutation(async (opts) => {
      const newArticle = await opts.ctx.prisma.post.create({
        data: {
          authorId: opts.input.authorId,
          title: opts.input.title,
          image: opts.input.image,
          article: opts.input.article,
        },
      });
      if (!newArticle) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
      return {
        status: "OK",
      };
    }),
});
