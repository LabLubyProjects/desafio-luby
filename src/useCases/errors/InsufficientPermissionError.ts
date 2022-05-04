export default class InsufficientPermissionError extends Error {
  constructor() {
    super("Sua permissão não é suficiente para executar a ação");
  }
}