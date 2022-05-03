import { EmployeeType } from "@src/domain/employee/Employee";
import { VehicleStatus } from "@src/domain/vehicle/Vehicle";

export function translateVehicleStatus(type: VehicleStatus): string {
  switch(type) {
    case VehicleStatus.AVAILABLE: return "Disponível";
    case VehicleStatus.BOOKED: return "Reservado";
    case VehicleStatus.SOLD: return "Vendido";
  }
}

export function translateEmployeeType(type: EmployeeType): string {
  return type === EmployeeType.ADMIN ? "Administrador" : "Vendedor";
}