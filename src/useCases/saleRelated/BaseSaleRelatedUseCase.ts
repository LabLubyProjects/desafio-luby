import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import SaleRepository from "@src/domain/sale/SaleRepository";
import VehicleRepository from "@src/domain/vehicle/VehicleRepository";

export default class BaseSaleRelatedUseCase {
  constructor(public saleRepository: SaleRepository, public employeeRepository: EmployeeRepository, public vehicleRepository: VehicleRepository) {}
}