import { GenericInputClass } from "@src/useCases/util/GenericInputClass";
import { validate } from "class-validator";
import GenericClassValidatorError from "../errors/GenericClassValidatorError";

export default class BaseController {
  static async validateInput(input: GenericInputClass): Promise<void> {
    const errors = await validate(input);

    if(errors.length !== 0 && errors[0].constraints !== undefined) {
      const constraint = Object.keys(errors[0].constraints)[0];
      throw new GenericClassValidatorError(errors[0].constraints[constraint])
    }
  }
}