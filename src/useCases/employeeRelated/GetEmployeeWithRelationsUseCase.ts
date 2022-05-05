import NotFoundError from "../errors/NotFoundError";
import { OutputReservationWithIDs } from "../reservationRelated/ReservationIO";
import { OutputSaleWithIDs } from "../saleRelated/SaleIO";
import { format } from "../util/dateFormat";
import { translateEmployeeType } from "../util/enumTranslators";
import BaseEmployeeRelatedUseCase from "./BaseEmployeeRelatedUseCase";
import { InputGetEmployeeWithRelations, OutputGetEmployeeWithRelations } from "./EmployeeIO";

export default class GetEmployeeWithRelationsUseCase extends BaseEmployeeRelatedUseCase {
  async handle(inputGetEmployee: InputGetEmployeeWithRelations): Promise<OutputGetEmployeeWithRelations> {
    const employeeWithRelations = await this.employeeRepository.getByIDWithRelations(inputGetEmployee.id);
    if(!employeeWithRelations) throw new NotFoundError();
    const outputReservations: OutputReservationWithIDs[] = employeeWithRelations.reservations.map(reservation => ({ id: reservation.id, vehicleID: reservation.vehicleID, employeeID: reservation.employeeID, price: reservation.price, date: format(reservation.date) })); 
    const outputSales: OutputSaleWithIDs[] = employeeWithRelations.sales.map(sale => ({ id: sale.id, vehicleID: sale.vehicleID, employeeID: sale.employeeID, price: sale.price, date: format(sale.date) }));
    const outputEmployeeWithRelations: OutputGetEmployeeWithRelations = { id: employeeWithRelations.employee.id, cpf: employeeWithRelations.employee.cpf, name: employeeWithRelations.employee.name, email: employeeWithRelations.employee.email, biography: employeeWithRelations.employee.biography, type: translateEmployeeType(employeeWithRelations.employee.type), reservations: outputReservations, sales: outputSales };
    return outputEmployeeWithRelations;
  }
}