import ReservationImpl from "@src/domain/reservation/Reservation";
import { VehicleStatus } from "@src/domain/vehicle/Vehicle";
import NotFoundError from "../errors/NotFoundError";
import { format } from "../util/dateFormat";
import BaseReservationRelatedUseCase from "./BaseReservationRelatedUseCase";
import { InputReserve, OutputReservation } from "./ReservationIO";

export default class ReserveUseCase extends BaseReservationRelatedUseCase {
  async handle(inputReserve: InputReserve): Promise<OutputReservation> {
    const employee = await this.employeeRepository.getByID(inputReserve.employeeID);
    if(!employee) throw new NotFoundError();

    const vehicle = await this.vehicleRepository.getByID(inputReserve.vehicleID);
    if(!vehicle) throw new NotFoundError();

    const inputReservation = new ReservationImpl(inputReserve.vehicleID, inputReserve.employeeID, inputReserve.price);
    const newReservation = await this.reservationRepository.create(inputReservation);
    await this.vehicleRepository.updateStatus(vehicle.id, VehicleStatus.BOOKED);
    const outputReservation :OutputReservation = { id: newReservation.id, vehicleBrand: vehicle.brand, vehicleModel: vehicle.model, price: inputReservation.price, employeeName: employee.name, date: format(newReservation.date) }; 
    return outputReservation;
  }
}