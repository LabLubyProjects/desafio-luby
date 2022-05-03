import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import SaleRepository from "@src/domain/sale/SaleRepository";
import VehicleRepository from "@src/domain/vehicle/VehicleRepository";
import GetAllSalesByEmployeeID from "@src/useCases/saleRelated/GetAllSalesByEmployeeID";
import { InputGetAllSalesByEmployee, InputSell, OutputSale } from "@src/useCases/saleRelated/SaleIO";
import SellUseCase from "@src/useCases/saleRelated/SellUseCase";

export default class SaleController {
  static sell(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository,
    saleRepository: SaleRepository
  ): Promise<OutputSale> {
    const { vehicleID, employeeID, price } = body;
    const input: InputSell = {vehicleID, employeeID, price}; 
    return new SellUseCase(saleRepository, employeeRepository, vehicleRepository).handle(input);
  }

  static getAllSalesByEmployee(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository,
    saleRepository: SaleRepository
  ): Promise<OutputSale[]> {
    const { employeeID } = params;
    const input: InputGetAllSalesByEmployee = {employeeID};
    return new GetAllSalesByEmployeeID(saleRepository, employeeRepository, vehicleRepository).handle(input);
  }
}
