import { VehicleStatus } from "@src/domain/vehicle/Vehicle";
import { IsEnum, IsInt, IsNumber, IsUUID, Max, Min, MinLength } from "class-validator";

export class InputAcquireNewVehicle {
  @IsUUID(4, { message: 'ID do funcionário inválido' })
  sourceEmployeeID: string;

  @MinLength(1, { message: 'Informe a marca'})
  brand: string;

  @MinLength(1, { message: 'Informe o modelo'})
  model: string;

  @IsInt({ message: 'O ano deve ser um inteiro'})
  @Min(1900, { message: 'O ano deve ser maior ou igual a 1900'})
  year: number;

  @IsNumber(undefined, { message: 'A quilometragem deve ser um número'})
  @Min(0, { message: 'A quilometragem deve ser maior ou igual a 0'})
  km: number;

  @MinLength(1, { message: 'Informe a cor'})
  color: string;

  @MinLength(1, { message: 'Informe o chassi'})
  chassi: string;

  @IsNumber(undefined, { message: 'O preço deve ser um número'})
  @Min(100, { message: 'O valor mínimo é R$100,00'})
  price: number;

  constructor(sourceEmployeeID: string, brand: string, model: string, year: number, km: number, color: string, chassi: string, price: number) {
    this.sourceEmployeeID = sourceEmployeeID;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.km = km;
    this.color = color;
    this.chassi = chassi;
    this.price = price;
  }
}

export interface OutputVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  color: string;
  chassi: string;
  price: number;
  status: string;
}

export class InputFilterVehicleByStatus {
  @IsEnum(VehicleStatus, { message: 'Status do veículo inválido' })
  status: VehicleStatus;

  @IsInt({ message: 'O número da página deve ser um inteiro' })
  @Min(0, { message: 'O número da página não pode ser negativo' })
  pageNumber: number;

  @IsInt({ message: 'O tamanho da página deve ser um inteiro' })
  @Min(1, { message: 'O tamanho da página deve ser maior que zero' })
  @Max(20, { message: 'O tamanho da página deve ser menor que vinte' })
  pageSize: number;

  constructor(status: VehicleStatus, pageNumber = 0, pageSize = 10) {
    this.status = status;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}

export class InputGetAllVehicles {
  @IsInt({ message: 'O número da página deve ser um inteiro' })
  @Min(0, { message: 'O número da página não pode ser negativo' })
  pageNumber: number;

  @IsInt({ message: 'O tamanho da página deve ser um inteiro' })
  @Min(1, { message: 'O tamanho da página deve ser maior que zero' })
  @Max(20, { message: 'O tamanho da página deve ser menor que vinte' })
  pageSize: number;

  constructor(pageNumber = 0, pageSize = 10) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}

export class InputGetVehicleByID {
  @IsUUID(4, {message: 'ID do veículo inválido'})
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class InputDeleteVehicle {
  @IsUUID(4, {message: 'ID do funcionário inválido'})
  sourceEmployeeID: string;

  @IsUUID(4, {message: 'ID do veículo inválido'})
  targetVehicleID: string;

  constructor(sourceEmployeeID: string, targetVehicleID: string) {
    this.sourceEmployeeID = sourceEmployeeID;
    this.targetVehicleID = targetVehicleID;
  }
}