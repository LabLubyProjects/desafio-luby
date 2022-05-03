import NotFoundError from "../errors/NotFoundError";
import { translateVehicleStatus } from "../util/enumTranslators";
import BaseVehicleRelatedUseCase from "./BaseVehicleRelatedUseCase";
import { InputGetVehicleByID, OutputVehicle } from "./VehicleIO";

export default class GetVehicleByID extends BaseVehicleRelatedUseCase {
  async handle(inputGetVehicleByID: InputGetVehicleByID): Promise<OutputVehicle> {
    const vehicle = await this.vehicleRepository.getByID(inputGetVehicleByID.id);
    if(!vehicle) throw new NotFoundError();
    const outputVehicle: OutputVehicle = { id: vehicle.id, brand: vehicle.brand, model: vehicle.model, year: vehicle.year, km: vehicle.km, color: vehicle.color, chassi: vehicle.chassi, price: vehicle.price, status: translateVehicleStatus(vehicle.status) }; 
    return outputVehicle;
  }
}