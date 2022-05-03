export interface InputReserve {
  vehicleID: string;
  employeeID: string;
  price: number;
}

export interface InputGetAllReservationsByEmployee {
  employeeID: string;
}

export interface OutputReservation {
  id: string;
  vehicleBrand: string;
  vehicleModel: string;
  price: number;
  employeeName: string;
  date: string;
}