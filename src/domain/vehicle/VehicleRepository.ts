import { Vehicle, VehicleStatus } from "./Vehicle";

export default interface VehicleRepository {
  getAll(): Promise<Vehicle[]>;
  getByStatus(status: VehicleStatus): Promise<Vehicle[]>;
  getByID(id: string): Promise<Vehicle | null>;
  create(newVehicle: Vehicle): Promise<string>;
  delete(id: string): Promise<void>;
  updateStatus(id: string, newStatus: VehicleStatus): Promise<void>;
}