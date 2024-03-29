import EmployeeRepository from '@src/domain/employee/EmployeeRepository';
import SaleRepository from '@src/domain/sale/SaleRepository';
import VehicleRepository from '@src/domain/vehicle/VehicleRepository';
import GetAllSalesByEmployeeID from '@src/useCases/saleRelated/GetAllSalesByEmployeeID';
import {
  InputGetAllSalesByEmployee,
  InputSell,
  OutputSale,
} from '@src/useCases/saleRelated/SaleIO';
import SellUseCase from '@src/useCases/saleRelated/SellUseCase';
import BaseController from './BaseController';

export default class SaleController extends BaseController {
  static async sell(
    params: any,
    body: any,
    query: any,
    headers: any,
    saleRepository: SaleRepository,
    employeeRepository: EmployeeRepository,
    vehicleRepository: VehicleRepository
  ): Promise<OutputSale> {
    const token = headers.authorization.split(' ')[1];
    const { vehicleID, price } = body;
    const employeeID = BaseController.decodeIDFromToken(token);
    const input = new InputSell(vehicleID, employeeID, price);

    await BaseController.validateInput(input);

    return new SellUseCase(
      saleRepository,
      employeeRepository,
      vehicleRepository
    ).handle(input);
  }

  static async getAllSalesByEmployee(
    params: any,
    body: any,
    query: any,
    headers: any,
    saleRepository: SaleRepository,
    employeeRepository: EmployeeRepository,
    vehicleRepository: VehicleRepository
  ): Promise<OutputSale[]> {
    const { employeeID } = params;
    const { page, size } = query;

    let input;

    if (page && size)
      input = new InputGetAllSalesByEmployee(
        employeeID,
        Number.parseInt(page),
        Number.parseInt(size)
      );
    else input = new InputGetAllSalesByEmployee(employeeID);

    await BaseController.validateInput(input);

    return new GetAllSalesByEmployeeID(
      saleRepository,
      employeeRepository,
      vehicleRepository
    ).handle(input);
  }
}
