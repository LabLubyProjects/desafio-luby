import { Reservation } from './Reservation';

export default interface ReservationRepository {
  getByEmployeeID(
    id: string,
    pageNumber: number,
    pageSize: number
  ): Promise<Reservation[]>;
  create(reservation: Reservation): Promise<string>;
}
