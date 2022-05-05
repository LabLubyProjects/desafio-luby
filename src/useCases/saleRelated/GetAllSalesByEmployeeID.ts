import { format } from '../util/dateFormat';
import { translateVehicleStatus } from '../util/enumTranslators';
import BaseSaleRelatedUseCase from './BaseSaleRelatedUseCase';
import { InputGetAllSalesByEmployee, OutputSale } from './SaleIO';

export default class GetAllSalesByEmployeeID extends BaseSaleRelatedUseCase {
  async handle(
    inputGetAllSalesByEmployee: InputGetAllSalesByEmployee
  ): Promise<OutputSale[]> {
    const sales = await this.saleRepository.getByEmployeeID(
      inputGetAllSalesByEmployee.employeeID,
      inputGetAllSalesByEmployee.pageNumber,
      inputGetAllSalesByEmployee.pageSize
    );
    const employee = await this.employeeRepository.getByID(
      inputGetAllSalesByEmployee.employeeID
    );
    const outputSales: OutputSale[] = await Promise.all(
      sales.map(async (sale) => {
        const vehicle = await this.vehicleRepository.getByID(sale.vehicleID);
        return {
          id: sale.id,
          vehicleBrand: vehicle!.brand,
          vehicleModel: vehicle!.model,
          vehicleStatus: translateVehicleStatus(vehicle!.status),
          price: sale.price,
          employeeName: employee!.name,
          date: format(sale.date),
        };
      })
    );

    return outputSales;
  }
}
