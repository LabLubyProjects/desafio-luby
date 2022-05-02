export class InvalidSellerIDError extends Error {
  constructor() {
    super("ID do vendedor inválido");
  }
}