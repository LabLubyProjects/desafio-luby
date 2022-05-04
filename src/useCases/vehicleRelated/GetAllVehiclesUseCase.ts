import { translateVehicleStatus } from "../util/enumTranslators";
import BaseVehicleRelatedUseCase from "./BaseVehicleRelatedUseCase";
import { InputGetAllVehicles, OutputVehicle } from "./VehicleIO";

export default class GetAllVehiclesUseCase extends BaseVehicleRelatedUseCase {
  async handle(inputGetAllVehicles: InputGetAllVehicles): Promise<OutputVehicle[]> {
    const vehicles = await this.vehicleRepository.getAll(inputGetAllVehicles.pageNumber, inputGetAllVehicles.pageSize);
    const outputVehicles: OutputVehicle[] = vehicles.map(vehicle => ({id: vehicle.id, brand: vehicle.brand, model: vehicle.model, year: vehicle.year, km: vehicle.km, color: vehicle.color, chassi: vehicle.chassi, price: vehicle.price, status: translateVehicleStatus(vehicle.status) }))
    return outputVehicles;
  }
}