import ExpressAdapter from '@src/conectors/adapters/ExpressAdapter';
import EmployeeController from '@src/conectors/controllers/EmployeeController';
import VehicleController from '@src/conectors/controllers/VehicleController';
import SaleController from '@src/conectors/controllers/SaleController';
import ReservationController from '@src/conectors/controllers/ReservationController';
import { Router } from 'express';
import authChecker from './authChecker';
import repos from '@src/external/database/sequelize/repositories/repos';

const router: Router = Router();

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
    EmployeeController.getEmployeeWithRelations,
    200,
    repos.employees
  )
);

router.post(
  '/employees',
  ExpressAdapter.create(EmployeeController.createEmployee, 201, repos.employees)
);

router.post(
  '/login/employees',
  ExpressAdapter.create(EmployeeController.login, 200, repos.employees)
);

router.delete(
  '/employees/:id',
  authChecker,
  ExpressAdapter.create(EmployeeController.deleteEmployee, 204, repos.employees)
);

router.put(
  '/employees/:id',
  authChecker,
  ExpressAdapter.create(EmployeeController.updateEmployee, 200, repos.employees)
);

router.get(
  '/vehicles',
  ExpressAdapter.create(
    VehicleController.getAllVehicles,
    200,
    repos.vehicles,
    repos.employees
  )
);

router.get(
  '/vehicles/:id',
  ExpressAdapter.create(
    VehicleController.getVehiclesByID,
    200,
    repos.vehicles,
    repos.employees
  )
);

router.post(
  '/vehicles',
  authChecker,
  ExpressAdapter.create(
    VehicleController.createVehicle,
    201,
    repos.vehicles,
    repos.employees
  )
);

router.delete(
  '/vehicles/:id',
  authChecker,
  ExpressAdapter.create(
    VehicleController.deleteVehicle,
    204,
    repos.vehicles,
    repos.employees
  )
);

router.get(
  '/vehicles/filter/:status',
  ExpressAdapter.create(
    VehicleController.filterByStatus,
    200,
    repos.vehicles,
    repos.employees
  )
);

router.get(
  '/employees/:employeeID/sales',
  ExpressAdapter.create(
    SaleController.getAllSalesByEmployee,
    200,
    repos.sales,
    repos.employees,
    repos.vehicles
  )
);
router.post(
  '/sales',
  authChecker,
  ExpressAdapter.create(
    SaleController.sell,
    201,
    repos.sales,
    repos.employees,
    repos.vehicles
  )
);

router.get(
  '/employees/:employeeID/reservations',
  ExpressAdapter.create(
    ReservationController.getAllReservationsByEmployee,
    200,
    repos.reservations,
    repos.employees,
    repos.vehicles
  )
);
router.post(
  '/reservations',
  authChecker,
  ExpressAdapter.create(
    ReservationController.reserve,
    201,
    repos.reservations,
    repos.employees,
    repos.vehicles
  )
);

export { router };
