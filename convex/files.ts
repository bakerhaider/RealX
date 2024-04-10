import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createFile = mutation({
  args: {
    username: v.string(),
    content: v.string(),
    photoUrl: v.optional(v.string()),
    storageId: v.id('_storage'),
    author: v.string(),
    body: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError('no auth');
    }
    await ctx.db.insert('files', {
      username: args.username,
      content: args.content,
      photoUrl: args.photoUrl,
    });
  },
});

export const getFiles = query({
  args: {},
  async handler(ctx, args) {
    return await ctx.db.query('files').order('desc').collect();
  },
});
