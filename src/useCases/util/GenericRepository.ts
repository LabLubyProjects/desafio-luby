import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import ReservationRepository from "@src/domain/reservation/ReservationRepository";
import SaleRepository from "@src/domain/sale/SaleRepository";
import VehicleRepository from "@src/domain/vehicle/VehicleRepository";

export type GenericRepository = EmployeeRepository | VehicleRepository | SaleRepository | ReservationRepository;