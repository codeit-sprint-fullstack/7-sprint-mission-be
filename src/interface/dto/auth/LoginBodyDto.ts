import { z } from "zod";

export const LoginBodyDto = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginBodyDto = z.infer<typeof LoginBodyDto>;
