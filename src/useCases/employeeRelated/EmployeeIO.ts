import { EmployeeType } from "@src/domain/employee/Employee";

export interface InputCreateEmployee {
  cpf: string;
  name: string;
  email: string;
  biography: string;
  password: string;
  type: EmployeeType;
}

export interface OutputCreateEmployee {
  id: string;
  cpf: string;
  name: string;
  email: string;
  biography: string;
  type: EmployeeType;
}