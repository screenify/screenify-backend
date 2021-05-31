import { Request, Response, NextFunction } from "express";
export const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.json({ error: err });
};
