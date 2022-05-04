import SaleImpl, { Sale } from "@src/domain/sale/Sale";
import SaleRepository from "@src/domain/sale/SaleRepository";
import SaleModel from "../models/SaleModel";

export default class SequelizeSaleRepository implements SaleRepository {
  async getByEmployeeID(id: string, pageNumber: number, pageSize: number): Promise<Sale[]> {
    const salesFromDB = await SaleModel.findAll({
      limit: pageSize,
      offset: pageNumber * pageSize,
      where: {
        employee_id: id
      }
    });
    const sales = salesFromDB.map(sale => (new SaleImpl(sale.getDataValue('vehicle_id'), sale.getDataValue('employee_id'), sale.getDataValue('price'), sale.getDataValue('status'), sale.getDataValue('date'), sale.getDataValue('id'))));
    return sales;
  }
  async create(sale: Sale): Promise<string> {
    await SaleModel.create({ vehicle_id: sale.vehicleID, employee_id: sale.employeeID, price: sale.price, status: sale.vehicleStatus });
    return sale.id;
  }
}