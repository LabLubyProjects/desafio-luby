import { Employee } from "./Employee";

export default interface EmployeeRepository {
  getAll(): Promise<Employee[]>;
  getByID(id: string): Promise<Employee | null>;
  getByCPF(cpf: string): Promise<Employee | null>;
  getByEmail(email: string): Promise<Employee | null>;
  create(newEmployee: Employee): Promise<string>;
  delete(id: string): Promise<void>;
}