import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";
import BaseVehicleRelatedUseCase from "./BaseVehicleRelatedUseCase";
import { InputDeleteVehicle } from "./VehicleIO";

export default class DeleteVehicleUseCase extends BaseVehicleRelatedUseCase {
  async handle(inputDeleteVehicle: InputDeleteVehicle): Promise<void> {
    const sourceEmployee = await this.employeeRepository.getByID(inputDeleteVehicle.sourceEmployeeID);
    const targetVehicle = await this.vehicleRepository.getByID(inputDeleteVehicle.targetVehicleID);
    if(!sourceEmployee || !targetVehicle) throw new NotFoundError();
    if(!sourceEmployee.isAdmin()) throw new UnauthorizedError();

    await this.employeeRepository.delete(inputDeleteVehicle.targetVehicleID);
  }
}