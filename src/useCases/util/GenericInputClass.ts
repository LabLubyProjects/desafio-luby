import { InputCreateEmployee, InputDeleteEmployee, InputGetAllEmployees, InputGetEmployeeByID, InputLoginEmployee } from "../employeeRelated/EmployeeIO";
import { InputGetAllReservationsByEmployee, InputReserve } from "../reservationRelated/ReservationIO";
import { InputGetAllSalesByEmployee, InputSell } from "../saleRelated/SaleIO";
import { InputAcquireNewVehicle, InputDeleteVehicle, InputFilterVehicleByStatus, InputGetAllVehicles, InputGetVehicleByID } from "../vehicleRelated/VehicleIO";

export type GenericInputClass = InputAcquireNewVehicle | InputFilterVehicleByStatus | InputGetVehicleByID | InputSell | InputGetAllSalesByEmployee | InputReserve | InputGetAllReservationsByEmployee | InputCreateEmployee | InputDeleteEmployee | InputGetEmployeeByID | InputGetAllEmployees | InputLoginEmployee | InputGetAllVehicles | InputDeleteVehicle 