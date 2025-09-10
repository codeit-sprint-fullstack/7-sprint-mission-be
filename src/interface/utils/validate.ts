import { Request, Response, NextFunction } from "express";
import { UnprocessableEntityException } from "../../exceptions/UnporcessableEntityException";
import { ZodSchema } from "zod";

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "validation failed";
      return next(new UnprocessableEntityException(msg));
    }
    req.body = parsed.data as any;
    next();
  };
}
