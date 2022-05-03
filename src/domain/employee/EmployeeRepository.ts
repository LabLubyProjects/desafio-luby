import { Employee } from "./Employee";

export default interface EmployeeRepository {
  getAll(): Promise<Employee[]>;
  getByID(id: string): Promise<Employee>;
  getByCPF(cpf: string): Promise<Employee>;
  getByEmail(email: string): Promise<Employee>;
  create(newEmployee: Employee): Promise<Employee>;
  delete(id: string): Promise<void>;
}