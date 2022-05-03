import SaleImpl from "@src/domain/sale/Sale";
import { VehicleStatus } from "@src/domain/vehicle/Vehicle";
import NotFoundError from "../errors/NotFoundError";
import { format } from "../util/dateFormat";
import { translateVehicleStatus } from "../util/enumTranslators";
import BaseSaleRelatedUseCase from "./BaseSaleRelatedUseCase";
import { InputSell, OutputSale } from "./SaleIO";

export default class SellUseCase extends BaseSaleRelatedUseCase {
  async handle(inputSell: InputSell): Promise<OutputSale> {
    const employee = await this.employeeRepository.getByID(inputSell.employeeID);
    if(!employee) throw new NotFoundError();

    const vehicle = await this.vehicleRepository.getByID(inputSell.vehicleID);
    if(!vehicle) throw new NotFoundError();

    const inputSale = new SaleImpl(inputSell.vehicleID, inputSell.employeeID, inputSell.price, VehicleStatus.SOLD);
    const newSale = await this.saleRepository.create(inputSale);
    await this.vehicleRepository.updateStatus(vehicle.id, VehicleStatus.SOLD);
    const outputSale :OutputSale = { id: newSale.id, vehicleBrand: vehicle.brand, vehicleModel: vehicle.model, vehicleStatus: translateVehicleStatus(VehicleStatus.SOLD), price: inputSale.price, employeeName: employee.name, date: format(newSale.date) }; 
    return outputSale;
  }
}