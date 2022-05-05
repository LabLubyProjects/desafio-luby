import VehicleImpl, {
  Vehicle,
  VehicleStatus,
} from '@src/domain/vehicle/Vehicle';
import VehicleRepository from '@src/domain/vehicle/VehicleRepository';
import VehicleModel from '../models/VehicleModel';

export default class SequelizeVehicleRepository implements VehicleRepository {
  async getAll(pageNumber: number, pageSize: number): Promise<Vehicle[]> {
    const vehiclesFromDB = await VehicleModel.findAll({
      limit: pageSize,
      offset: pageNumber * pageSize,
    });
    const vehicles = vehiclesFromDB.map(
      (vehicle) =>
        new VehicleImpl(
          vehicle.getDataValue('brand'),
          vehicle.getDataValue('model'),
          vehicle.getDataValue('year'),
          vehicle.getDataValue('km'),
          vehicle.getDataValue('color'),
          vehicle.getDataValue('chassi'),
          vehicle.getDataValue('price'),
          vehicle.getDataValue('status'),
          vehicle.getDataValue('id')
        )
    );
    return vehicles;
  }
  async getByStatus(
    status: VehicleStatus,
    pageNumber: number,
    pageSize: number
  ): Promise<Vehicle[]> {
    const vehiclesFromDB = await VehicleModel.findAll({
      limit: pageSize,
      offset: pageNumber * pageSize,
      where: {
        status: status,
      },
    });
    const vehicles = vehiclesFromDB.map(
      (vehicle) =>
        new VehicleImpl(
          vehicle.getDataValue('brand'),
          vehicle.getDataValue('model'),
          vehicle.getDataValue('year'),
          vehicle.getDataValue('km'),
          vehicle.getDataValue('color'),
          vehicle.getDataValue('chassi'),
          vehicle.getDataValue('price'),
          vehicle.getDataValue('status'),
          vehicle.getDataValue('id')
        )
    );
    return vehicles;
  }
  async getByID(id: string): Promise<Vehicle | null> {
    const vehicleFromDB = await VehicleModel.findByPk(id);
    if (!vehicleFromDB) return null;
    return new VehicleImpl(
      vehicleFromDB.getDataValue('brand'),
      vehicleFromDB.getDataValue('model'),
      vehicleFromDB.getDataValue('year'),
      vehicleFromDB.getDataValue('km'),
      vehicleFromDB.getDataValue('color'),
      vehicleFromDB.getDataValue('chassi'),
      vehicleFromDB.getDataValue('price'),
      vehicleFromDB.getDataValue('status'),
      vehicleFromDB.getDataValue('id')
    );
  }
  async create(newVehicle: Vehicle): Promise<string> {
    await VehicleModel.create({
      brand: newVehicle.brand,
      model: newVehicle.model,
      year: newVehicle.year,
      km: newVehicle.km,
      color: newVehicle.color,
      chassi: newVehicle.chassi,
      price: newVehicle.price,
      status: newVehicle.status,
      id: newVehicle.id,
    });
    return newVehicle.id;
  }
  async delete(id: string): Promise<void> {
    await VehicleModel.destroy({ where: { id: id } });
  }
  async updateStatus(id: string, newStatus: VehicleStatus): Promise<void> {
    await VehicleModel.update(
      { status: newStatus },
      {
        where: {
          id: id,
        },
      }
    );
  }
}
