import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import SaleRepository from "@src/domain/sale/SaleRepository";
import VehicleRepository from "@src/domain/vehicle/VehicleRepository";
import GetAllSalesByEmployeeID from "@src/useCases/saleRelated/GetAllSalesByEmployeeID";
import { InputGetAllSalesByEmployee, InputSell, OutputSale } from "@src/useCases/saleRelated/SaleIO";
import SellUseCase from "@src/useCases/saleRelated/SellUseCase";
import BaseController from "./BaseController";

export default class SaleController extends BaseController{
  static async sell(
    params: any,
    body: any,
    query: any,
    headers: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository,
    saleRepository: SaleRepository
  ): Promise<OutputSale> {
    const token = headers.authorization.split(" ")[1];
    const { vehicleID, price } = body;
    const employeeID = BaseController.decodeIDFromToken(token);
    const input = new InputSell(vehicleID, employeeID, price); 

    return new SellUseCase(saleRepository, employeeRepository, vehicleRepository).handle(input);
  }

  static async getAllSalesByEmployee(
    params: any,
    body: any,
    query: any,
    headers: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository,
    saleRepository: SaleRepository
  ): Promise<OutputSale[]> {
    const { employeeID } = params;
    const { page, size } = query; 
    const input = new InputGetAllSalesByEmployee(employeeID, page, size);

    await BaseController.validateInput(input);

    return new GetAllSalesByEmployeeID(saleRepository, employeeRepository, vehicleRepository).handle(input);
  }
}
