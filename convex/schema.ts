import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  files: defineTable({
    username: v.string(),
    content: v.string(),
    photoUrl: v.optional(v.string()),
  }),
});
