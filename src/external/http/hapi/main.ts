import Hapi from '@hapi/hapi';
import HapiAdapter from '@src/conectors/adapters/HapiAdapter';
import EmployeeController from '@src/conectors/controllers/EmployeeController';
import repos from '@src/external/database/sequelize/repositories/repos';
import dotenv from 'dotenv';
import { db } from '@src/external/database/sequelize/database';
import associate from '@src/external/database/sequelize/models/associations';
import VehicleController from '@src/conectors/controllers/VehicleController';
import SaleController from '@src/conectors/controllers/SaleController';
import ReservationController from '@src/conectors/controllers/ReservationController';

dotenv.config();

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

try {
  db.sync();
  console.log('[Connected to Database]');
  associate();
} catch (error) {
  console.log('Could not connect to database');
}

(async (): Promise<void> => {
  try {
    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          db.close();
          console.log('[Database Conection Closed]');
          process.exit(ExitStatus.Success);
        } catch (error) {
          process.exit(ExitStatus.Failure);
        }
      })
    );
  } catch (error) {
    process.exit(ExitStatus.Failure);
  }
})();

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: 'localhost',
  });

  server.route({
    method: 'GET',
    path: '/employees',
    handler: HapiAdapter.create(
      EmployeeController.getAllEmployees,
      200,
      true,
      repos.employees
    ),
  });
  server.route({
    method: 'GET',
    path: '/employees/{id}',
    handler: HapiAdapter.create(
      EmployeeController.getEmployeeWithRelations,
      200,
      true,
      repos.employees
    ),
  });
  server.route({
    method: 'POST',
    path: '/employees',
    handler: HapiAdapter.create(
      EmployeeController.createEmployee,
      201,
      true,
      repos.employees
    ),
  });
  server.route({
    method: 'POST',
    path: '/login/employees',
    handler: HapiAdapter.create(
      EmployeeController.login,
      200,
      true,
      repos.employees
    ),
  });
  server.route({
    method: 'PUT',
    path: '/employees/{id}',
    handler: HapiAdapter.create(
      EmployeeController.updateEmployee,
      200,
      true,
      repos.employees
    ),
  });
  server.route({
    method: 'DELETE',
    path: '/employees/{id}',
    handler: HapiAdapter.create(
      EmployeeController.deleteEmployee,
      204,
      true,
      repos.employees
    ),
  });

  server.route({
    method: 'GET',
    path: '/vehicles',
    handler: HapiAdapter.create(
      VehicleController.getAllVehicles,
      200,
      true,
      repos.vehicles,
      repos.employees
    ),
  });
  server.route({
    method: 'GET',
    path: '/vehicles/{id}',
    handler: HapiAdapter.create(
      VehicleController.getVehiclesByID,
      200,
      true,
      repos.vehicles,
      repos.employees
    ),
  });
  server.route({
    method: 'GET',
    path: '/vehicles/filter/{status}',
    handler: HapiAdapter.create(
      VehicleController.filterByStatus,
      200,
      true,
      repos.vehicles,
      repos.employees
    ),
  });
  server.route({
    method: 'POST',
    path: '/vehicles',
    handler: HapiAdapter.create(
      VehicleController.createVehicle,
      201,
      true,
      repos.vehicles,
      repos.employees
    ),
  });
  server.route({
    method: 'DELETE',
    path: '/vehicles/{id}',
    handler: HapiAdapter.create(
      VehicleController.deleteVehicle,
      204,
      true,
      repos.vehicles,
      repos.employees
    ),
  });

  server.route({
    method: 'GET',
    path: '/employees/{employeeID}/sales',
    handler: HapiAdapter.create(
      SaleController.getAllSalesByEmployee,
      200,
      true,
      repos.sales,
      repos.employees,
      repos.vehicles
    ),
  });
  server.route({
    method: 'POST',
    path: '/sales',
    handler: HapiAdapter.create(
      SaleController.sell,
      201,
      true,
      repos.sales,
      repos.employees,
      repos.vehicles
    ),
  });

  server.route({
    method: 'GET',
    path: '/employees/{employeeID}/reservations',
    handler: HapiAdapter.create(
      ReservationController.getAllReservationsByEmployee,
      200,
      true,
      repos.reservations,
      repos.employees,
      repos.vehicles
    ),
  });
  server.route({
    method: 'POST',
    path: '/reservations',
    handler: HapiAdapter.create(
      ReservationController.reserve,
      201,
      true,
      repos.reservations,
      repos.employees,
      repos.vehicles
    ),
  });

  await server.start();
};

init();
