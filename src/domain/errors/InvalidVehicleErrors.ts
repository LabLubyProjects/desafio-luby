export class InvalidVehicleIDError extends Error {
  constructor() {
    super("ID do veículo inválido");
  }
}

export class NegativePriceError extends Error {
  constructor() {
    super("Preço não pode ser negativo");
  }
}

export class NegativeYearError extends Error {
  constructor() {
    super("Ano não pode ser negativo");
  }
}

export class NegativeKMError extends Error {
  constructor() {
    super("KM não pode ser negativo");
  }
}