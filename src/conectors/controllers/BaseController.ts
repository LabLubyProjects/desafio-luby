import { GenericInputClass } from '@src/useCases/util/GenericInputClass';
import { validate } from 'class-validator';
import GenericClassValidatorError from '../errors/GenericClassValidatorError';
import { hash, genSalt, compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export interface DecodedJWT {
  id: string;
}

export interface ResponseJWT {
  jwt: string;
}

export interface ResponseID {
  id: string;
}

export default class BaseController {
  static async validateInput(input: GenericInputClass): Promise<void> {
    const errors = await validate(input);

    if (errors.length !== 0 && errors[0].constraints !== undefined) {
      const constraint = Object.keys(errors[0].constraints)[0];
      throw new GenericClassValidatorError(errors[0].constraints[constraint]);
    }
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }

  static async compareHashedPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const result = await compare(password, hashedPassword);
    return result;
  }

  static generateJWT(idToBeIncluded: string): string {
    const secret = process.env.SECRET as string;
    const token = jwt.sign({ id: idToBeIncluded }, secret);
    return token;
  }

  static decodeIDFromToken(token: string): string {
    const decoded = jwt.decode(token) as DecodedJWT;
    return decoded.id;
  }
}
