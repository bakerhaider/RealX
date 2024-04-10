import { action, internalMutation, mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendImage = mutation({
  args: {
    storageId: v.optional(v.id('_storage')),
    author: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('messages', {
      body: args.storageId,
      author: args.author,
      format: 'image',
      content: args.content,
    });
  },
});
