import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import VehicleRepository from "@src/domain/vehicle/VehicleRepository";
import AcquireNewVehicleUseCase from "@src/useCases/vehicleRelated/AcquireNewVehicleUseCase";
import DeleteVehicleUseCase from "@src/useCases/vehicleRelated/DeleteVehicleUseCase";
import FilterVehicleByStatusUseCase from "@src/useCases/vehicleRelated/FilterVehicleByStatusUseCase";
import GetAllVehiclesUseCase from "@src/useCases/vehicleRelated/GetAllVehiclesUseCase";
import GetVehicleByID from "@src/useCases/vehicleRelated/GetVehicleByIDUseCase";
import { InputAcquireNewVehicle, InputDeleteVehicle, InputFilterVehicleByStatus, InputGetVehicleByID, OutputVehicle } from "@src/useCases/vehicleRelated/VehicleIO";

export default class VehicleController {
  static createVehicle(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<string> {
    const { sourceEmployeeID, brand, model, year, km, color, chassi, price } = body;
    const input: InputAcquireNewVehicle = {sourceEmployeeID, brand, model, year, km, color, chassi, price}; 
    return new AcquireNewVehicleUseCase(vehicleRepository, employeeRepository).handle(input);
  }

  static getAllVehicles(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<OutputVehicle[]> {
    return new GetAllVehiclesUseCase(vehicleRepository, employeeRepository).handle();
  }

  static getVehiclesByID(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<OutputVehicle> {
    const { id } = params;
    const input: InputGetVehicleByID = {id}; 
    return new GetVehicleByID(vehicleRepository, employeeRepository).handle(input);
  }

  static deleteVehicle(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<void> {
    const { sourceEmployeeID, vehicleID } = params;
    const input: InputDeleteVehicle = {sourceEmployeeID, targetVehicleID: vehicleID}; 
    return new DeleteVehicleUseCase(vehicleRepository, employeeRepository).handle(input);
  }

  static filterByStatus(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository
  ): Promise<OutputVehicle[]> {
    const { status } = query;
    const input: InputFilterVehicleByStatus = { status };
    return new FilterVehicleByStatusUseCase(vehicleRepository, employeeRepository).handle(input);
  }
}
