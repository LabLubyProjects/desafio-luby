import { Reservation } from "../reservation/Reservation";
import { Sale } from "../sale/Sale";
import { Employee } from "./Employee";

export default interface EmployeeRepository {
  getAll(pageNumber: number, pageSize: number): Promise<Employee[]>;
  getByID(id: string): Promise<Employee | null>;
  getByIDWithRelations(id: string): Promise<{employee: Employee, reservations: Reservation[], sales: Sale[]} | null>
  getByCPF(cpf: string): Promise<Employee | null>;
  getByEmail(email: string): Promise<Employee | null>;
  create(newEmployee: Employee): Promise<string>;
  delete(id: string): Promise<void>;
  update(employee: Employee): Promise<Employee>;
}