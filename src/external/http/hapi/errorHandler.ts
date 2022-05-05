import GenericClassValidatorError from '@src/conectors/errors/GenericClassValidatorError';
import InvalidPasswordError from '@src/conectors/errors/InvalidPasswordError';
import InvalidTokenError from '@src/conectors/errors/InvalidTokenError';
import UnauthorizedError from '@src/conectors/errors/UnauthorizedError';
import AlreadyExistsError from '@src/useCases/errors/AlreadyExistsError';
import InsufficientPermissionError from '@src/useCases/errors/InsufficientPermissionError';
import NotFoundError from '@src/useCases/errors/NotFoundError';
import UnavailableVehicleError from '@src/useCases/errors/UnavailableVehicleError';

export default function (error: Error, h: any) {
  if (error instanceof GenericClassValidatorError)
    return h.response({ statusCode: 400, message: error.message }).code(400);

  if (error instanceof InvalidTokenError)
    return h.response({ statusCode: 400, message: error.message }).code(400);

  if (error instanceof UnauthorizedError)
    return h.response({ statusCode: 401, message: error.message }).code(401);

  if (error instanceof InsufficientPermissionError)
    return h.response({ statusCode: 403, message: error.message }).code(403);

  if (error instanceof NotFoundError)
    return h.response({ statusCode: 404, message: error.message }).code(404);

  if (error instanceof AlreadyExistsError)
    return h.response({ statusCode: 409, message: error.message }).code(409);

  if (error instanceof UnavailableVehicleError)
    return h.response({ statusCode: 409, message: error.message }).code(409);

  if (error instanceof InvalidPasswordError)
    return h.response({ statusCode: 409, message: error.message }).code(409);

  return h.response({ statusCode: 500, message: error.message }).code(500);
}
