import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getPostById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          image: true,
          title: true,
          description: true,
          authorId: true,
          article: true,
          createdAt: true,
        },
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }
      return post;
    }),

  getRecentPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: { id: true },
    });
    return posts.map((post) => post.id);
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
