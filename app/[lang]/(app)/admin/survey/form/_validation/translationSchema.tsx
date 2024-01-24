// src/validation/translationSchema.js
import { z } from 'zod';

const translationSchema = z.object({
  language: z.string().min(2, "Language code must be at least 2 characters long"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  messages: z.array(z.string().min(1, "Message is required")).length(5, "Exactly 5 messages are required"),
});

export default translationSchema;
