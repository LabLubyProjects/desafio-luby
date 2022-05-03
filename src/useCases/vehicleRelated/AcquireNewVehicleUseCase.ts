import VehicleImpl from "@src/domain/vehicle/Vehicle";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";
import { translateVehicleStatus } from "../util/enumTranslators";
import BaseVehicleRelatedUseCase from "./BaseVehicleRelatedUseCase";
import { InputAcquireNewVehicle, OutputVehicle } from "./VehicleIO";

export default class AcquireNewVehicleUseCase extends BaseVehicleRelatedUseCase {
  async handle(inputAcquireNewVehicle: InputAcquireNewVehicle): Promise<OutputVehicle> {
    const sourceEmployee = await this.employeeRepository.getByID(inputAcquireNewVehicle.sourceEmployeeID);
    if(!sourceEmployee) throw new NotFoundError();
    if(!sourceEmployee.isAdmin()) throw new UnauthorizedError();

    const inputNewEmployee = new VehicleImpl(inputAcquireNewVehicle.brand, inputAcquireNewVehicle.model, inputAcquireNewVehicle.year, inputAcquireNewVehicle.km, inputAcquireNewVehicle.color, inputAcquireNewVehicle.chassi, inputAcquireNewVehicle.price); 
    const newVehicle = await this.vehicleRepository.create(inputNewEmployee);
    const outputVehicle: OutputVehicle = { id: newVehicle.id, brand: newVehicle.brand, model: newVehicle.model, year: newVehicle.year, km: newVehicle.km, color: newVehicle.color, chassi: newVehicle.chassi, price: newVehicle.price, status: translateVehicleStatus(newVehicle.status) }; 
    return outputVehicle;
  }
}