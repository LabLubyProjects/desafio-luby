import EmployeeImpl, { Employee } from "@src/domain/employee/Employee";
import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import EmployeeModel from "../models/EmployeeModel";

export default class SequelizeEmployeeRepository implements EmployeeRepository {

  async getAll(pageNumber: number, pageSize: number): Promise<Employee[]> {
    const employeesFromDB = await EmployeeModel.findAll({
      limit: pageSize,
      offset: pageNumber * pageSize
    });
    const employees = employeesFromDB.map(employee => (new EmployeeImpl(employee.getDataValue('cpf'), employee.getDataValue('name'), employee.getDataValue('email'), employee.getDataValue('biography'), employee.getDataValue('password'), employee.getDataValue('type'), employee.getDataValue('id'))));
    return employees;
  }
  async getByID(id: string): Promise<Employee | null> {
    const employeeFromDB = await EmployeeModel.findByPk(id);
    if(!employeeFromDB) return null;
    return new EmployeeImpl(employeeFromDB.getDataValue('cpf'), employeeFromDB.getDataValue('name'), employeeFromDB.getDataValue('email'), employeeFromDB.getDataValue('biography'), employeeFromDB.getDataValue('password'), employeeFromDB.getDataValue('type'), employeeFromDB.getDataValue('id'));
  }
  async getByCPF(cpf: string): Promise<Employee | null> {
    const employeeFromDB = await EmployeeModel.findOne({ where: {cpf: cpf} });
    if(!employeeFromDB) return null;
    return new EmployeeImpl(employeeFromDB.getDataValue('cpf'), employeeFromDB.getDataValue('name'), employeeFromDB.getDataValue('email'), employeeFromDB.getDataValue('biography'), employeeFromDB.getDataValue('password'), employeeFromDB.getDataValue('type'), employeeFromDB.getDataValue('id'));
  }
  async getByEmail(email: string): Promise<Employee | null> {
    const employeeFromDB = await EmployeeModel.findOne({ where: {email: email} });
    if(!employeeFromDB) return null;
    return new EmployeeImpl(employeeFromDB.getDataValue('cpf'), employeeFromDB.getDataValue('name'), employeeFromDB.getDataValue('email'), employeeFromDB.getDataValue('biography'), employeeFromDB.getDataValue('password'), employeeFromDB.getDataValue('type'), employeeFromDB.getDataValue('id'));
  }
  async create(newEmployee: Employee): Promise<string> {
    await EmployeeModel.create({ id: newEmployee.id, name: newEmployee.name, cpf: newEmployee.cpf, email: newEmployee.email, biography: newEmployee.biography, password: newEmployee.password, type: newEmployee.type });
    return newEmployee.id;
  }
  async delete(id: string): Promise<void> {
    await EmployeeModel.destroy({ where: { id: id } });
  }
  
}