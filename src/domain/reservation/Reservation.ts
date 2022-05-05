import { v4 } from 'uuid';

export interface Reservation {
  id: string;
  vehicleID: string;
  employeeID: string;
  price: number;
  date: Date;
}

export default class ReservationImpl implements Reservation {
  id: string;
  date: Date;

  constructor(
    public vehicleID: string,
    public employeeID: string,
    public price: number,
    date?: Date,
    id?: string
  ) {
    id ? (this.id = id) : (this.id = v4());
    date ? (this.date = date) : (this.date = new Date());
  }
}
