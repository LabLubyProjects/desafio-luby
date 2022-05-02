import { Employee } from "./Employee";

export default interface EmployeeRepository {
  getAll(): Promise<Employee[]>;
  getByID(id: string): Promise<Employee>;
  create(newEmployee: Employee): Promise<Employee>;
}