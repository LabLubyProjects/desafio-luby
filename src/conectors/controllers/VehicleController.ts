import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import VehicleRepository from "@src/domain/vehicle/VehicleRepository";
import AcquireNewVehicleUseCase from "@src/useCases/vehicleRelated/AcquireNewVehicleUseCase";
import DeleteVehicleUseCase from "@src/useCases/vehicleRelated/DeleteVehicleUseCase";
import FilterVehicleByStatusUseCase from "@src/useCases/vehicleRelated/FilterVehicleByStatusUseCase";
import GetAllVehiclesUseCase from "@src/useCases/vehicleRelated/GetAllVehiclesUseCase";
import GetVehicleByID from "@src/useCases/vehicleRelated/GetVehicleByIDUseCase";
import { InputAcquireNewVehicle, InputDeleteVehicle, InputFilterVehicleByStatus, InputGetAllVehicles, InputGetVehicleByID, OutputVehicle } from "@src/useCases/vehicleRelated/VehicleIO";
import BaseController, { ResponseID } from "./BaseController";

export default class VehicleController extends BaseController {
  static async createVehicle(
    params: any,
    body: any,
    query: any,
    headers: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<ResponseID> {
    const token = headers.authorization.split(" ")[1];
    const { brand, model, year, km, color, chassi, price } = body;
    const sourceEmployeeID = BaseController.decodeIDFromToken(token);
    const input = new InputAcquireNewVehicle(sourceEmployeeID, brand, model, year, km, color, chassi, price); 
    
    await BaseController.validateInput(input);

    return {id: await(new AcquireNewVehicleUseCase(vehicleRepository, employeeRepository).handle(input))};
  }

  static async getAllVehicles(
    params: any,
    body: any,
    query: any,
    headers: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<OutputVehicle[]> {
    const { page, size } = query;

    let input;

    if(page && size)
      input = new InputGetAllVehicles(Number.parseInt(page), Number.parseInt(size));
    else
      input = new InputGetAllVehicles();  
    
    await BaseController.validateInput(input);

    return new GetAllVehiclesUseCase(vehicleRepository, employeeRepository).handle(input);
  }

  static async getVehiclesByID(
    params: any,
    body: any,
    query: any,
    headers: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<OutputVehicle> {
    const { id } = params;
    const input = new InputGetVehicleByID(id); 

    await BaseController.validateInput(input);

    return new GetVehicleByID(vehicleRepository, employeeRepository).handle(input);
  }

  static async deleteVehicle(
    params: any,
    body: any,
    query: any,
    headers: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<void> {
    const token = headers.authorization.split(" ")[1];
    const { id } = params;
    const sourceEmployeeID = BaseController.decodeIDFromToken(token);
    const input = new InputDeleteVehicle(sourceEmployeeID, id); 

    await BaseController.validateInput(input)

    return new DeleteVehicleUseCase(vehicleRepository, employeeRepository).handle(input);
  }

  static async filterByStatus(
    params: any,
    body: any,
    query: any,
    headers: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<OutputVehicle[]> {
    const { status } = params;
    const { page, size } = query;
    
    let input;

    if(page && size)
      input = new InputFilterVehicleByStatus(Number.parseInt(status), Number.parseInt(page), Number.parseInt(size));
    else
      input = new InputFilterVehicleByStatus(Number.parseInt(status));  
    
    await BaseController.validateInput(input);
    
    return new FilterVehicleByStatusUseCase(vehicleRepository, employeeRepository).handle(input);
  }
}
