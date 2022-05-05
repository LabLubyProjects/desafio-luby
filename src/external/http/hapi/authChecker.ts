import InvalidTokenError from "@src/conectors/errors/InvalidTokenError";
import UnauthorizedError from "@src/conectors/errors/UnauthorizedError";
import { Request } from '@hapi/hapi';
import * as jwt from "jsonwebtoken";

export default function authChecker(req: Request) {
  const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw new UnauthorizedError();
          
    try {
      const secret = process.env.SECRET as string;
      jwt.verify(token, secret);
    } catch (error) {
        throw new InvalidTokenError();
    }
}