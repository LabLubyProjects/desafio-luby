import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import ReservationRepository from "@src/domain/reservation/ReservationRepository";
import VehicleRepository from "@src/domain/vehicle/VehicleRepository";

export default class BaseReservationRelatedUseCase {
  constructor(public reservationRepository: ReservationRepository, public employeeRepository: EmployeeRepository, public vehicleRepository: VehicleRepository) {}
}