import { IsInt, IsNumber, IsUUID, Max, Min } from 'class-validator';

export class InputSell {
  @IsUUID(4, {message: 'ID do veículo inválido'})
  vehicleID: string;

  @IsUUID(4, {message: 'ID do funcionário inválido'})
  employeeID: string;

  @IsNumber(undefined, { message: 'O preço deve ser um número'})
  @Min(100, { message: 'O valor mínimo é R$100,00'})
  price: number;

  constructor(vehicleID: string, employeeID: string, price: number) {
    this.vehicleID = vehicleID;
    this.employeeID = employeeID;
    this.price = price;
  }
}

export class InputGetAllSalesByEmployee {
  @IsUUID(4, {message: 'ID do funcionário inválido'})
  employeeID: string;

  @IsInt({ message: 'O número da página deve ser um inteiro' })
  @Min(0, { message: 'O número da página não pode ser negativo' })
  pageNumber: number;

  @IsInt({ message: 'O tamanho da página deve ser um inteiro' })
  @Min(1, { message: 'O tamanho da página deve ser maior que zero' })
  @Max(20, { message: 'O tamanho da página deve ser menor que vinte' })
  pageSize: number;

  constructor(employeeID: string, pageNumber = 0, pageSize = 10) {
    this.employeeID = employeeID;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}

export interface OutputSale {
  id: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleStatus: string;
  price: number;
  employeeName: string;
  date: string;
}

export interface OutputSaleWithIDs {
  id: string;
  vehicleID: string;
  employeeID: string;
  price: number;
  date: string;
}