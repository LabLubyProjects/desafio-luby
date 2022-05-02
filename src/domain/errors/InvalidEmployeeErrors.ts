export class InvalidEmployeeIDError extends Error {
  constructor() {
    super("ID do funcionário inválido");
  }
}