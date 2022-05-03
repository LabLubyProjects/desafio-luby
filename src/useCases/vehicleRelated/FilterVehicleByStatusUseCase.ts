import BaseVehicleRelatedUseCase from "./BaseVehicleRelatedUseCase";
import { InputFilterVehicleByStatus, OutputVehicle } from "./VehicleIO";

export default class FilterVehicleByStatusUseCase extends BaseVehicleRelatedUseCase {
  async handle(inputFilterVehicleByStatus: InputFilterVehicleByStatus): Promise<OutputVehicle[]> {
    const filteredVehicles = await this.vehicleRepository.getByStatus(inputFilterVehicleByStatus.status);
    const outputVehicles: OutputVehicle[] = filteredVehicles.map(vehicle => ({id: vehicle.id, brand: vehicle.brand, model: vehicle.model, year: vehicle.year, km: vehicle.km, color: vehicle.color, chassi: vehicle.chassi, price: vehicle.price }))
    return outputVehicles;
  }
} 