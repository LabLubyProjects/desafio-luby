import VehicleImpl from '@src/domain/vehicle/Vehicle';
import NotFoundError from '../errors/NotFoundError';
import InsufficientPermissionError from '../errors/InsufficientPermissionError';
import BaseVehicleRelatedUseCase from './BaseVehicleRelatedUseCase';
import { InputAcquireNewVehicle } from './VehicleIO';

export default class AcquireNewVehicleUseCase extends BaseVehicleRelatedUseCase {
  async handle(
    inputAcquireNewVehicle: InputAcquireNewVehicle
  ): Promise<string> {
    const sourceEmployee = await this.employeeRepository.getByID(
      inputAcquireNewVehicle.sourceEmployeeID
    );
    if (!sourceEmployee) throw new NotFoundError();
    if (!sourceEmployee.isAdmin()) throw new InsufficientPermissionError();

    const inputNewEmployee = new VehicleImpl(
      inputAcquireNewVehicle.brand,
      inputAcquireNewVehicle.model,
      inputAcquireNewVehicle.year,
      inputAcquireNewVehicle.km,
      inputAcquireNewVehicle.color,
      inputAcquireNewVehicle.chassi,
      inputAcquireNewVehicle.price
    );
    const newVehicleID = await this.vehicleRepository.create(inputNewEmployee);
    return newVehicleID;
  }
}
