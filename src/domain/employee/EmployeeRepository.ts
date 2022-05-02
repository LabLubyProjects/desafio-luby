import { Employee } from "./Employee";

export default interface EmployeeRepository {
  getAll(): Promise<Employee[]>;
  getByID(): Promise<Employee>;
}