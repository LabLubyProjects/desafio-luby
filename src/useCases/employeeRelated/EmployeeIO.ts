import { EmployeeType } from "@src/domain/employee/Employee";
import { IsCPF } from "brazilian-class-validator";
import { IsEmail, IsEnum, IsInt, IsOptional, IsUUID, Max, Min, MinLength } from "class-validator";

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

export class InputGetAllEmployees {
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

export class InputLoginEmployee {
  @IsEmail(undefined, {message: 'Email inválido'})
  email: string;

  @MinLength(1, { message: 'Informe a senha'})
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export interface OutputLoginEmployee {
  id: string;
  email: string;
  password: string;
}

export class InputUpdateEmployee {
  @IsUUID(4, {message: 'ID do funcionário inválido'})
  id: string;

  @IsOptional()
  @MinLength(1, { message: 'Informe um nome'})
  name: string;

  @IsOptional()
  @IsEmail(undefined, {message: 'Novo email inválido'})
  email: string;

  biography: string;

  @IsOptional()
  @MinLength(6, { message: 'Informe um uma senha com o mínimo de 6 caracteres'})
  password: string;

  @IsOptional()
  @IsEnum(EmployeeType, {message: "Tipo de funcionário inválido"})
  type: EmployeeType;

  constructor(id: string, name: string, email: string, biography: string, password: string, type: EmployeeType) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.biography = biography;
    this.password = password;
    this.type = type;
  }
}