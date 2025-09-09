import { z } from "zod";

export const CreateLocalUserBodyDto = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  nickname: z.string().min(2).max(20),
  image: z.string().url().optional(),
});

export type CreateUserBodyDto = z.infer<typeof CreateLocalUserBodyDto>;
