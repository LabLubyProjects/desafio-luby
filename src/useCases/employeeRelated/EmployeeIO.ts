import { EmployeeType } from "@src/domain/employee/Employee";
import { IsCPF } from "brazilian-class-validator";
import { IsEmail, IsEnum, IsUUID, MinLength } from "class-validator";

export class InputCreateEmployee {
  @IsCPF({message: 'CPF inválido'})
  cpf: string;

  @MinLength(1, { message: 'Informe um nome'})
  name: string;

  @IsEmail(undefined, {message: 'Email inválido'})
  email: string;

  biography: string;

  @MinLength(6, { message: 'Informe um uma senha com o mínimo de 6 caracteres'})
  password: string;

  @IsEnum(EmployeeType, {message: "Tipo de funcionário inválido"})
  type: EmployeeType;

  constructor(cpf: string, name: string, email: string, biography: string, password: string, type: EmployeeType) {
    this.cpf = cpf;
    this.name = name;
    this.email = email;
    this.biography = biography;
    this.password = password;
    this.type = type;
  }
}

export interface OutputEmployee {
  id: string;
  cpf: string;
  name: string;
  email: string;
  biography: string;
  type: string;
}

export class InputGetEmployeeByID {
  @IsUUID(4, {message: 'ID do funcionário inválido'})
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class InputDeleteEmployee {
  @IsUUID(4, {message: 'ID do funcionário alvo inválido'})
  targetEmployeeID: string;

  @IsUUID(4, {message: 'ID do funcionário fonte inválido'})
  sourceEmployeeID: string;

  constructor(targetEmployeeID: string, sourceEmployeeID: string) {
    this.targetEmployeeID = targetEmployeeID;
    this.sourceEmployeeID = sourceEmployeeID;
  }
}