import { v4 } from 'uuid';

export interface Employee {
  id: string;
  cpf: string;
  name: string;
  email: string;
  biography: string;
  password: string;
  type: EmployeeType;
}

export enum EmployeeType {
  ADMIN,
  SELLER
}

export default class EmployeeImpl implements Employee {

  id: string;
  cpf: string;
  name: string;
  email: string;
  biography: string;
  password: string;
  type: EmployeeType;

  constructor(cpf: string, name: string, email: string, biography: string, password: string, type: EmployeeType, id?: string) {
    if(!id) this.id = v4();
    else this.id = id;
    this.cpf = cpf;
    this.name = name;
    this.email = email;
    this.biography = biography;
    this.password = password;
    this.type = type;
  }
}