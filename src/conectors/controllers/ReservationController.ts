import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import ReservationRepository from "@src/domain/reservation/ReservationRepository";
import VehicleRepository from "@src/domain/vehicle/VehicleRepository";
import GetAllReservationsByEmployeeID from "@src/useCases/reservationRelated/GetAllReservationsByEmployeeID";
import { InputGetAllReservationsByEmployee, InputReserve, OutputReservation } from "@src/useCases/reservationRelated/ReservationIO";
import ReserveUseCase from "@src/useCases/reservationRelated/ReserveUseCase";
import BaseController from "./BaseController";

export default class ReservationController extends BaseController{
  static async reserve(
    params: any,
    body: any,
    query: any,
    headers: any,
    reservationRepository: ReservationRepository,
    employeeRepository: EmployeeRepository,
    vehicleRepository: VehicleRepository
  ): Promise<OutputReservation> {
    const token = headers.authorization.split(" ")[1];
    const { vehicleID, price } = body;
    const employeeID = BaseController.decodeIDFromToken(token);
    const input = new InputReserve(vehicleID, employeeID, price); 

    await BaseController.validateInput(input);

    return new ReserveUseCase(reservationRepository, employeeRepository, vehicleRepository).handle(input);
  }

  static async getAllReservationsByEmployee(
    params: any,
    body: any,
    query: any,
    headers: any,
    reservationRepository: ReservationRepository,
    employeeRepository: EmployeeRepository,
    vehicleRepository: VehicleRepository
  ): Promise<OutputReservation[]> {
    const { employeeID } = params;
    const { page, size } = query; 
    let input;

    if(page && size)
      input = new InputGetAllReservationsByEmployee(employeeID, Number.parseInt(page), Number.parseInt(size));
    else
      input = new InputGetAllReservationsByEmployee(employeeID);  

    await BaseController.validateInput(input);

    return new GetAllReservationsByEmployeeID(reservationRepository, employeeRepository, vehicleRepository).handle(input);
  }
}
