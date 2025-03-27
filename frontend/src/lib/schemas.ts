import { z } from "zod";

export const formSchema = z.object({
  phoneNumbers: z.array(z.string().min(10, "Please enter a valid phone number")),
  message: z.string().min(1, "Message cannot be empty"),
  schedule: z.string().min(1, "Please select a schedule"),
  isActive: z.boolean().default(true),
});