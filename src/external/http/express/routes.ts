import ExpressAdapter from '@src/conectors/adapters/ExpressAdapter';
import EmployeeController from '@src/conectors/controllers/EmployeeController';
import VehicleController from '@src/conectors/controllers/VehicleController';
import SequelizeEmployeeRepository from '@src/external/database/sequelize/repositories/SequelizeEmployeeRepository';
import SequelizeReservationRepository from '@src/external/database/sequelize/repositories/SequelizeReservationRepository';
import SequelizeSaleRepository from '@src/external/database/sequelize/repositories/SequelizeSaleRepository';
import SequelizeVehicleRepository from '@src/external/database/sequelize/repositories/SequelizeVehicleRepository';
import { Router } from 'express';


const router: Router = Router();
const repos = {
  employees: new SequelizeEmployeeRepository(),
  vehicles: new SequelizeVehicleRepository(),
  sales: new SequelizeSaleRepository(),
  reservations: new SequelizeReservationRepository()
}

router.get(
  '/employees',
  ExpressAdapter.create(
    EmployeeController.getAllEmployees,
    200,
    repos.employees
  )
);
router.get(
  '/employees/:id',
  ExpressAdapter.create(
    EmployeeController.getEmployeesByID,
    200,
    repos.employees
  )
);

router.post(
  '/employees',
  ExpressAdapter.create(
    EmployeeController.createEmployee,
    201,
    repos.employees
  )
);

router.delete(
  '/medidores/:id',
  ExpressAdapter.create(
    EmployeeController.deleteEmployee,
    204,
    repos.employees
  )
);

export { router };
