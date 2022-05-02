import { Sale } from "./Sale";

export default interface SaleRepository {
  getByEmployeeID(id: string): Promise<Sale[]>;
  getByID(id: string): Promise<Sale>;
}