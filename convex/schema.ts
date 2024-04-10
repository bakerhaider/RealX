import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  files: defineTable({
    username: v.string(),
    content: v.string(),
    photoUrl: v.optional(v.string()),
  }),
  messages: defineTable({
    author: v.string(),
    body: v.optional(v.id('_storage')),
    format: v.string(),
    content: v.string(),
  }),
  images: defineTable({
    storageId: v.id('_storage'),
    prompt: v.string(),
  }),
});
