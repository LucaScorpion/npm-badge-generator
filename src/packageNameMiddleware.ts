import { NextFunction, Request, Response } from 'express';

export function packageNameMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let name = req.params['0'];

  if (name.endsWith('/')) {
    name = name.substring(0, name.length - 1);
  }

  if (!name) {
    throw new Error('No package name given.');
  }

  req.packageName = name;
  next();
}
