import ReservationImpl from '@src/domain/reservation/Reservation';
import Reservation from '@src/domain/reservation/Reservation';
import ReservationRepository from '@src/domain/reservation/ReservationRepository';
import ReservationModel from '../models/ReservationModel';

export default class SequelizeReservationRepository
  implements ReservationRepository
{
  async getByEmployeeID(
    id: string,
    pageNumber: number,
    pageSize: number
  ): Promise<Reservation[]> {
    const ReservationsFromDB = await ReservationModel.findAll({
      limit: pageSize,
      offset: pageNumber * pageSize,
      where: {
        employee_id: id,
      },
    });
    const Reservations = ReservationsFromDB.map(
      (Reservation) =>
        new ReservationImpl(
          Reservation.getDataValue('vehicle_id'),
          Reservation.getDataValue('employee_id'),
          Reservation.getDataValue('price'),
          Reservation.getDataValue('status'),
          Reservation.getDataValue('date')
        )
    );
    return Reservations;
  }
  async create(reservation: Reservation): Promise<string> {
    await ReservationModel.create({
      id: reservation.id,
      vehicle_id: reservation.vehicleID,
      employee_id: reservation.employeeID,
      price: reservation.price,
      date: reservation.date,
    });
    return reservation.id;
  }
}
