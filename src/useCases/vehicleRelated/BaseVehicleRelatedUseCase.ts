import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import VehicleRepository from "@src/domain/vehicle/VehicleRepository";

export default class BaseVehicleRelatedUseCase {
  constructor(public vehicleRepository: VehicleRepository, public employeeRepository: EmployeeRepository) {}
}