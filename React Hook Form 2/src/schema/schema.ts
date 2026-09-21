import { z } from "zod";

export const experienceSchema = z.object({
  role: z.string().min(3, "Enter correct role"),
  company: z.string().min(2, "Company name is required"),
  years: z.number().min(1, "Atleast one year"),
});
export const registrationSchema = z
  .object({
    name: z.string().min(3, "Name is too short").max(100, "Is it your name ?"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Should be atleast 6 characters"),
    confimPassoword: z.string(),
    experience: z.array(experienceSchema).min(1, "Add atleast 1 exp"),
  })
  .refine((data) => data.password === data.confimPassoword, {
    message: "Password didn't match",
    path: ["confimPassoword"],
  });

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;
