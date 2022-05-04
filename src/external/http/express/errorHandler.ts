import GenericClassValidatorError from "@src/conectors/errors/GenericClassValidatorError";
import AlreadyExistsError from "@src/useCases/errors/AlreadyExistsError";
import NotFoundError from "@src/useCases/errors/NotFoundError";
import UnauthorizedError from "@src/useCases/errors/UnauthorizedError";
import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof GenericClassValidatorError)
    return res.status(400).json({ statusCode: 400, message: error.message });

  if (error instanceof UnauthorizedError)
    return res.status(403).json({ statusCode: 403, message: error.message });

  if (error instanceof NotFoundError)
    return res.status(404).json({ statusCode: 404, message: error.message });

  if (error instanceof AlreadyExistsError)
    return res.status(409).json({ statusCode: 409, message: error.message }); 

  return res.status(500).json({ statusCode: 500, message: error.message });
}
