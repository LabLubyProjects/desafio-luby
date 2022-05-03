import { v4 } from 'uuid';

export interface Employee {
  id: string;
  cpf: string;
  name: string;
  email: string;
  biography: string;
  password: string;
  type: EmployeeType;
  isAdmin(): boolean;
}

export enum EmployeeType {
  ADMIN,
  SELLER
}

export default class EmployeeImpl implements Employee {

  id: string;

  constructor(public cpf: string, public name: string, public email: string, public biography: string, public password: string, public type: EmployeeType, id?: string) {
    id ? this.id = id : this.id = v4();
  }

  isAdmin(): boolean {
    return this.type === EmployeeType.ADMIN;
  }
}