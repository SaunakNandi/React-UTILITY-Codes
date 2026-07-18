import { z } from "zod";

const addressSchema = z.object({
  city: z.string().min(3, `City name can't be less than 3`),
  pinCode: z.string().regex(/^\d{5}$/, "Must be 5 valid digits"),
});

const projectSchema = z.object({
  title: z.string().trim().min(3, "Title should be minimum of 3 characters"),
  url: z.url({ error: "Must be a valid url" }),
  id: z.string().trim(),
});

const baseSchema = z.object({
  name: z.string().min(3, "Name should be mininum of"),
  contact: z.object({
    address: addressSchema,
  }),
  project: z.array(projectSchema).min(1, "Add atleast one project to continue"),
});

export const mainSchema = z
  .discriminatedUnion("role", [
    baseSchema.extend({
      role: z.literal("frontend"),
      framork_or_library: z.string().min(2, "This can't be empty"),
    }),
    baseSchema.extend({
      role: z.literal("backend"),
      framork_or_library: z.string().min(2, "This can't be empty"),
    }),
    baseSchema.extend({
      role: z.literal("select"),
    }),
  ])
  .superRefine((data, ctx) => {
    if (data.role === "select") {
      ctx.addIssue({
        code: "custom",
        message: "Choose a valid role",
        path: ["role"],
      });
    }
  });

export type MainSchemaType = z.infer<typeof mainSchema>;
