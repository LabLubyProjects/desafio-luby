import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import VehicleRepository from "@src/domain/vehicle/VehicleRepository";
import AcquireNewVehicleUseCase from "@src/useCases/vehicleRelated/AcquireNewVehicleUseCase";
import DeleteVehicleUseCase from "@src/useCases/vehicleRelated/DeleteVehicleUseCase";
import FilterVehicleByStatusUseCase from "@src/useCases/vehicleRelated/FilterVehicleByStatusUseCase";
import GetAllVehiclesUseCase from "@src/useCases/vehicleRelated/GetAllVehiclesUseCase";
import GetVehicleByID from "@src/useCases/vehicleRelated/GetVehicleByIDUseCase";
import { InputAcquireNewVehicle, InputDeleteVehicle, InputFilterVehicleByStatus, InputGetAllVehicles, InputGetVehicleByID, OutputVehicle } from "@src/useCases/vehicleRelated/VehicleIO";
import BaseController from "./BaseController";

export default class VehicleController extends BaseController {
  static async createVehicle(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<string> {
    const { sourceEmployeeID, brand, model, year, km, color, chassi, price } = body;
    const input = new InputAcquireNewVehicle(sourceEmployeeID, brand, model, year, km, color, chassi, price); 
    
    await this.validateInput(input);

    return new AcquireNewVehicleUseCase(vehicleRepository, employeeRepository).handle(input);
  }

  static async getAllVehicles(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<OutputVehicle[]> {
    const { page, size } = query;
    const input = new InputGetAllVehicles(page, size);

    await this.validateInput(input);

    return new GetAllVehiclesUseCase(vehicleRepository, employeeRepository).handle(input);
  }

  static async getVehiclesByID(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<OutputVehicle> {
    const { id } = params;
    const input = new InputGetVehicleByID(id); 

    await this.validateInput(input);

    return new GetVehicleByID(vehicleRepository, employeeRepository).handle(input);
  }

  static async deleteVehicle(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<void> {
    const { sourceEmployeeID, vehicleID } = params;
    const input = new InputDeleteVehicle(sourceEmployeeID, vehicleID); 

    await this.validateInput(input)

    return new DeleteVehicleUseCase(vehicleRepository, employeeRepository).handle(input);
  }

  static async filterByStatus(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<OutputVehicle[]> {
    const { status, page, size } = query;
    const input = new InputFilterVehicleByStatus(status, page, size);

    await this.validateInput(input);
    
    return new FilterVehicleByStatusUseCase(vehicleRepository, employeeRepository).handle(input);
  }
}
