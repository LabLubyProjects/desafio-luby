import { Reservation } from "./Reservation";

export default interface ReservationRepository {
  getByEmployeeID(id: string): Promise<Reservation[]>;
  getByID(id: string): Promise<Reservation>;
}