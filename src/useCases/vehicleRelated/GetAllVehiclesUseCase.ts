import BaseVehicleRelatedUseCase from "./BaseVehicleRelatedUseCase";
import { OutputVehicle } from "./VehicleIO";

export default class GetAllVehiclesUseCase extends BaseVehicleRelatedUseCase {
  async handle(): Promise<OutputVehicle[]> {
    const vehicles = await this.vehicleRepository.getAll();
    const outputVehicles: OutputVehicle[] = vehicles.map(vehicle => ({id: vehicle.id, brand: vehicle.brand, model: vehicle.model, year: vehicle.year, km: vehicle.km, color: vehicle.color, chassi: vehicle.chassi, price: vehicle.price }))
    return outputVehicles;
  }
}