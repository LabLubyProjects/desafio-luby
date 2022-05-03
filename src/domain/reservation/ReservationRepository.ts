import { Reservation } from "./Reservation";

export default interface ReservationRepository {
  getByEmployeeID(id: string): Promise<Reservation[]>;
  create(reservation: Reservation): Promise<Reservation>;
}