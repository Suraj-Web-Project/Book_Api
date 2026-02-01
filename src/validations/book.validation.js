import { z } from "zod";

export const createBookSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description cannot exceed 2000 characters"),
  author: z.string().min(1, "Author is required"),
  publishDate: z.string().optional(),
});
