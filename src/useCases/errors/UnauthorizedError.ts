export default class UnauthorizedError extends Error {
  constructor() {
    super("Sem permissão para executar a ação");
  }
}