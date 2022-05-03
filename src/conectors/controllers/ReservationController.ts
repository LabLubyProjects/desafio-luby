import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import ReservationRepository from "@src/domain/reservation/ReservationRepository";
import VehicleRepository from "@src/domain/vehicle/VehicleRepository";
import GetAllReservationsByEmployeeID from "@src/useCases/reservationRelated/GetAllReservationsByEmployeeID";
import { InputGetAllReservationsByEmployee, InputReserve, OutputReservation } from "@src/useCases/reservationRelated/ReservationIO";
import ReserveUseCase from "@src/useCases/reservationRelated/ReserveUseCase";

export default class ReservationController {
  static reserve(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository,
    reservationRepository: ReservationRepository
  ): Promise<OutputReservation> {
    const { vehicleID, employeeID, price } = body;
    const input: InputReserve = {vehicleID, employeeID, price}; 
    return new ReserveUseCase(reservationRepository, employeeRepository, vehicleRepository).handle(input);
  }

  static getAllReservationsByEmployee(
    params: any,
    body: any,
    query: any,
    vehicleRepository: VehicleRepository,
    employeeRepository: EmployeeRepository,
    reservationRepository: ReservationRepository
  ): Promise<OutputReservation[]> {
    const { employeeID } = params;
    const input: InputGetAllReservationsByEmployee = {employeeID};
    return new GetAllReservationsByEmployeeID(reservationRepository, employeeRepository, vehicleRepository).handle(input);
  }
}
