import { Sale } from "./Sale";

export default interface SaleRepository {
  getByEmployeeID(id: string): Promise<Sale[]>;
  create(sale: Sale): Promise<Sale>;
}