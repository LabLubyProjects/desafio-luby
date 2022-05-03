export interface InputSell {
  vehicleID: string;
  employeeID: string;
  price: number;
}

export interface InputGetAllSalesByEmployee {
  employeeID: string;
}

export interface OutputSale {
  id: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleStatus: string;
  price: number;
  employeeName: string;
  date: string;
}