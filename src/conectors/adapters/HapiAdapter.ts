import { GenericRepository } from '@src/useCases/util/GenericRepository';
import { Request, ResponseToolkit } from '@hapi/hapi';
import errorHandler from '@src/external/http/hapi/errorHandler';
import authChecker from '@src/external/http/hapi/authChecker';

export default class ExpressAdapter {
  static create(
    fn: unknown,
    expectedStatusCode: number,
    protect: boolean,
    ...repositories: GenericRepository[]
  ) {
    return async (req: Request, h: ResponseToolkit) => {
      try {
        if (protect) {
          authChecker(req);
        }
        if (fn instanceof Function) {
          const obj = await fn(
            req.params,
            req.payload,
            req.query,
            req.headers,
            ...repositories
          );
          if (obj) return h.response(obj).code(expectedStatusCode);
          return h.response({}).code(expectedStatusCode);
        }
      } catch (error) {
        return errorHandler(error, h);
      }
    };
  }
}
