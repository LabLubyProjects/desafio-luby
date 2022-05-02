export class InvalidVehicleIDError extends Error {
  constructor() {
    super("ID do veículo inválido");
  }
}