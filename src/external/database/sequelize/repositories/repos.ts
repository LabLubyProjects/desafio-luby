import SequelizeEmployeeRepository from './SequelizeEmployeeRepository';
import SequelizeReservationRepository from './SequelizeReservationRepository';
import SequelizeSaleRepository from './SequelizeSaleRepository';
import SequelizeVehicleRepository from './SequelizeVehicleRepository';

const repos = {
  employees: new SequelizeEmployeeRepository(),
  vehicles: new SequelizeVehicleRepository(),
  sales: new SequelizeSaleRepository(),
  reservations: new SequelizeReservationRepository(),
};

export default repos;
