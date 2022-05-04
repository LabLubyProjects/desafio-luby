import { IsNumber, IsUUID, Min } from 'class-validator';

export class InputReserve {
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

export class InputGetAllReservationsByEmployee {
  @IsUUID(4, {message: 'ID do funcionário inválido'})
  employeeID: string;

  constructor(employeeID: string) {
    this.employeeID = employeeID;
  }
}

export interface OutputReservation {
  id: string;
  vehicleBrand: string;
  vehicleModel: string;
  price: number;
  employeeName: string;
  date: string;
}