import EmployeeImpl, { Employee } from '@src/domain/employee/Employee';
import EmployeeRepository from '@src/domain/employee/EmployeeRepository';
import ReservationImpl from '@src/domain/reservation/Reservation';
import Reservation from '@src/domain/reservation/Reservation';
import SaleImpl from '@src/domain/sale/Sale';
import Sale from '@src/domain/sale/Sale';
import EmployeeModel from '../models/EmployeeModel';

export default class SequelizeEmployeeRepository implements EmployeeRepository {
  async getAll(pageNumber: number, pageSize: number): Promise<Employee[]> {
    const employeesFromDB = await EmployeeModel.findAll({
      limit: pageSize,
      offset: pageNumber * pageSize,
    });
    const employees = employeesFromDB.map(
      (employee) =>
        new EmployeeImpl(
          employee.getDataValue('cpf'),
          employee.getDataValue('name'),
          employee.getDataValue('email'),
          employee.getDataValue('biography'),
          employee.getDataValue('password'),
          employee.getDataValue('type'),
          employee.getDataValue('id')
        )
    );
    return employees;
  }

  async update(employee: Employee): Promise<Employee> {
    const updateValues = {
      name: employee.name,
      email: employee.email,
      biography: employee.biography,
      password: employee.password,
      type: employee.type,
    };
    const employeeFromDB = await EmployeeModel.findByPk(employee.id);
    employeeFromDB?.update(updateValues);

    return new EmployeeImpl(
      employeeFromDB?.getDataValue('cpf'),
      employeeFromDB?.getDataValue('name'),
      employeeFromDB?.getDataValue('email'),
      employeeFromDB?.getDataValue('biography'),
      employeeFromDB?.getDataValue('password'),
      employeeFromDB?.getDataValue('type'),
      employeeFromDB?.getDataValue('id')
    );
  }

  async getByID(id: string): Promise<Employee | null> {
    const employeeFromDB = await EmployeeModel.findByPk(id);
    if (!employeeFromDB) return null;
    return new EmployeeImpl(
      employeeFromDB.getDataValue('cpf'),
      employeeFromDB.getDataValue('name'),
      employeeFromDB.getDataValue('email'),
      employeeFromDB.getDataValue('biography'),
      employeeFromDB.getDataValue('password'),
      employeeFromDB.getDataValue('type'),
      employeeFromDB.getDataValue('id')
    );
  }

  async getByIDWithRelations(id: string): Promise<{
    employee: Employee;
    reservations: Reservation[];
    sales: Sale[];
  } | null> {
    const employeeFromDB = await EmployeeModel.findByPk(id, {
      include: ['employee_sale', 'employee_reservation'],
    });
    if (!employeeFromDB) return null;
    const employeeImpl = new EmployeeImpl(
      employeeFromDB.getDataValue('cpf'),
      employeeFromDB.getDataValue('name'),
      employeeFromDB.getDataValue('email'),
      employeeFromDB.getDataValue('biography'),
      employeeFromDB.getDataValue('password'),
      employeeFromDB.getDataValue('type'),
      employeeFromDB.getDataValue('id')
    );
    const reservationsImpl = employeeFromDB
      .getDataValue('employee_reservation')
      .map(
        (reservation: any) =>
          new ReservationImpl(
            reservation.getDataValue('vehicle_id'),
            reservation.getDataValue('employee_id'),
            reservation.getDataValue('price'),
            reservation.getDataValue('date'),
            reservation.getDataValue('id')
          )
      );
    const salesImpl = employeeFromDB
      .getDataValue('employee_sale')
      .map(
        (sale: any) =>
          new SaleImpl(
            sale.getDataValue('vehicle_id'),
            sale.getDataValue('employee_id'),
            sale.getDataValue('price'),
            sale.getDataValue('status'),
            sale.getDataValue('date'),
            sale.getDataValue('id')
          )
      );
    return {
      employee: employeeImpl,
      reservations: reservationsImpl,
      sales: salesImpl,
    };
  }

  async getByCPF(cpf: string): Promise<Employee | null> {
    const employeeFromDB = await EmployeeModel.findOne({ where: { cpf: cpf } });
    if (!employeeFromDB) return null;
    return new EmployeeImpl(
      employeeFromDB.getDataValue('cpf'),
      employeeFromDB.getDataValue('name'),
      employeeFromDB.getDataValue('email'),
      employeeFromDB.getDataValue('biography'),
      employeeFromDB.getDataValue('password'),
      employeeFromDB.getDataValue('type'),
      employeeFromDB.getDataValue('id')
    );
  }
  async getByEmail(email: string): Promise<Employee | null> {
    const employeeFromDB = await EmployeeModel.findOne({
      where: { email: email },
    });
    if (!employeeFromDB) return null;
    return new EmployeeImpl(
      employeeFromDB.getDataValue('cpf'),
      employeeFromDB.getDataValue('name'),
      employeeFromDB.getDataValue('email'),
      employeeFromDB.getDataValue('biography'),
      employeeFromDB.getDataValue('password'),
      employeeFromDB.getDataValue('type'),
      employeeFromDB.getDataValue('id')
    );
  }
  async create(newEmployee: Employee): Promise<string> {
    await EmployeeModel.create({
      id: newEmployee.id,
      name: newEmployee.name,
      cpf: newEmployee.cpf,
      email: newEmployee.email,
      biography: newEmployee.biography,
      password: newEmployee.password,
      type: newEmployee.type,
    });
    return newEmployee.id;
  }
  async delete(id: string): Promise<void> {
    await EmployeeModel.destroy({ where: { id: id } });
  }
}
