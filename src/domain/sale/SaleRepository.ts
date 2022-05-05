import { Sale } from './Sale';

export default interface SaleRepository {
  getByEmployeeID(
    id: string,
    pageNumber: number,
    pageSize: number
  ): Promise<Sale[]>;
  create(sale: Sale): Promise<string>;
}
