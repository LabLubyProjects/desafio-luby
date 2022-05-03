import { GenericRepository } from "@src/useCases/util/GenericRepository";
import { NextFunction, Request, Response } from "express";

export default class ExpressAdapter {
  static create(
    fn: unknown,
    repository: GenericRepository,
    expectedStatusCode: number
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (fn instanceof Function) {
          const obj = await fn(req.params, req.body, req.query, repository);
          res.status(expectedStatusCode).json(obj);
        }
      } catch (error) {
        next(error);
      }
    };
  }
}
