import { format } from "../util/dateFormat";
import BaseReservationRelatedUseCase from "./BaseReservationRelatedUseCase";
import { InputGetAllReservationsByEmployee, OutputReservation } from "./ReservationIO";

export default class GetAllReservationsByEmployeeID extends BaseReservationRelatedUseCase {
  async handle(inputGetAllReservationsByEmployee: InputGetAllReservationsByEmployee): Promise<OutputReservation[]> {
    const reservations = await this.reservationRepository.getByEmployeeID(inputGetAllReservationsByEmployee.employeeID);
    const employee = await this.employeeRepository.getByID(inputGetAllReservationsByEmployee.employeeID);
    const outputReservations: OutputReservation[] = await Promise.all(reservations.map(async(reservation) => {
      const vehicle = await this.vehicleRepository.getByID(reservation.vehicleID);
      return {id: reservation.id, vehicleBrand: vehicle.brand, vehicleModel: vehicle.model, price: reservation.price, employeeName: employee.name, date: format(reservation.date)}
    }));

    return outputReservations;
  }
}