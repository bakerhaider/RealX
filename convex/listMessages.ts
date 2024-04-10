import { query } from './_generated/server';

export const list = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query('messages').order('desc').collect();
    return Promise.all(
      messages.map(async (message) => ({
        ...message,
        // If the message is an "image" its `body` is an `Id<"_storage">`
        ...(message.format === 'image'
          ? { url: await ctx.storage.getUrl(message.body) }
          : {}),
      }))
    );
  },
});
