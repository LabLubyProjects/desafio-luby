import { EmployeeType } from "@src/domain/employee/Employee";

export interface InputCreateEmployee {
  cpf: string;
  name: string;
  email: string;
  biography: string;
  password: string;
  type: EmployeeType;
}

export interface OutputEmployee {
  id: string;
  cpf: string;
  name: string;
  email: string;
  biography: string;
  type: string;
}

export interface InputGetEmployeeByID {
  id: string;
}

export interface InputDeleteEmployee {
  targetEmployeeID: string;
  sourceEmployeeID: string;
}