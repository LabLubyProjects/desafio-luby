import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import CreateEmployeeUseCase from "@src/useCases/employeeRelated/CreateEmployeeUseCase";
import DeleteEmployeeUseCase from "@src/useCases/employeeRelated/DeleteEmployeeUseCase";
import { InputCreateEmployee, InputDeleteEmployee, InputGetAllEmployees, InputGetEmployeeByID, OutputEmployee } from "@src/useCases/employeeRelated/EmployeeIO";
import GetAllEmployeesUseCase from "@src/useCases/employeeRelated/GetAllEmployeesUseCase";
import GetEmployeeByIDUseCase from "@src/useCases/employeeRelated/GetEmployeeByIDUseCase";
import BaseController from "./BaseController";

export default class EmployeeController extends BaseController {
  static async createEmployee(
    params: any,
    body: any,
    query: any,
    employeeRepository: EmployeeRepository
  ): Promise<string> {
    const { cpf, name, email, biography, password, type } = body;
    const input = new InputCreateEmployee(cpf, name, email, biography, password, type);
    
    await this.validateInput(input);
    
    return new CreateEmployeeUseCase(employeeRepository).handle(input);
  }

  static async getAllEmployees(
    params: any,
    body: any,
    query: any,
    employeeRepository: EmployeeRepository
  ): Promise<OutputEmployee[]> { 
    const { page, size } = query;
    const input = new InputGetAllEmployees(page, size);

    await this.validateInput(input);

    return new GetAllEmployeesUseCase(employeeRepository).handle(input);
  }

  static async getEmployeesByID(
    params: any,
    body: any,
    query: any,
    employeeRepository: EmployeeRepository
  ): Promise<OutputEmployee> {
    const { id } = params;
    const input = new InputGetEmployeeByID(id);
    
    await this.validateInput(input);
    
    return new GetEmployeeByIDUseCase(employeeRepository).handle(input);
  }

  static async deleteEmployee(
    params: any,
    body: any,
    query: any,
    employeeRepository: EmployeeRepository
  ): Promise<void> {
    const { sourceID, targetID } = params;
    const input = new InputDeleteEmployee(sourceID, targetID);
    
    await this.validateInput(input);
    
    return new DeleteEmployeeUseCase(employeeRepository).handle(input);
  }
}
