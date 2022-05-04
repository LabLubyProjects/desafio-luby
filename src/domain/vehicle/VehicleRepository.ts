import { Vehicle, VehicleStatus } from "./Vehicle";

export default interface VehicleRepository {
  getAll(pageNumber: number, pageSize: number): Promise<Vehicle[]>;
  getByStatus(status: VehicleStatus, pageNumber: number, pageSize: number): Promise<Vehicle[]>;
  getByID(id: string): Promise<Vehicle | null>;
  create(newVehicle: Vehicle): Promise<string>;
  delete(id: string): Promise<void>;
  updateStatus(id: string, newStatus: VehicleStatus): Promise<void>;
}