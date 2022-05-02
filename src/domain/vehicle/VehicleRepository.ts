import { Vehicle, VehicleStatus } from "./Vehicle";

export default interface EmployeeRepository {
  getAll(): Promise<Vehicle[]>;
  getByStatus(status: VehicleStatus): Promise<Vehicle[]>;
  getByID(): Promise<Vehicle>;
}