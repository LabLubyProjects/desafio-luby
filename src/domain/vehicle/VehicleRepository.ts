import { Vehicle, VehicleStatus } from "./Vehicle";

export default interface VehicleRepository {
  getAll(): Promise<Vehicle[]>;
  getByStatus(status: VehicleStatus): Promise<Vehicle[]>;
  getByID(id: string): Promise<Vehicle>;
  create(newVehicle: Vehicle): Promise<Vehicle>;
  delete(id: string): Promise<void>;
  updateStatus(id: string, newStatus: VehicleStatus): Promise<void>;
}