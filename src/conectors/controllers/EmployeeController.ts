import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import CreateEmployeeUseCase from "@src/useCases/employeeRelated/CreateEmployeeUseCase";
import DeleteEmployeeUseCase from "@src/useCases/employeeRelated/DeleteEmployeeUseCase";
import { InputCreateEmployee, InputDeleteEmployee, InputGetAllEmployees, InputGetEmployeeByID, InputLoginEmployee, InputUpdateEmployee, OutputEmployee } from "@src/useCases/employeeRelated/EmployeeIO";
import GetAllEmployeesUseCase from "@src/useCases/employeeRelated/GetAllEmployeesUseCase";
import GetEmployeeByIDUseCase from "@src/useCases/employeeRelated/GetEmployeeByIDUseCase";
import LoginEmployeeUseCase from "@src/useCases/employeeRelated/LoginEmployeeUseCase";
import UpdateEmployeeUseCase from "@src/useCases/employeeRelated/UpdateEmployeeUseCase";
import InvalidPasswordError from "../errors/InvalidPasswordError";
import BaseController from "./BaseController";

export default class EmployeeController extends BaseController {
  static async login(
    params: any,
    body: any,
    query: any,
    headers: any,
    employeeRepository: EmployeeRepository
  ): Promise<string> {
    const { email, password } = body;
    const input = new InputLoginEmployee(email, password);

    await this.validateInput(input);

    const user = await (new LoginEmployeeUseCase(employeeRepository).handle(input));
    
    if(!this.compareHashedPassword(password, user.password))
      throw new InvalidPasswordError();
    
    return this.generateJWT(user.id);  
  }

  static async createEmployee(
    params: any,
    body: any,
    query: any,
    headers: any,
    employeeRepository: EmployeeRepository
  ): Promise<string> {
    const { cpf, name, email, biography, password, type } = body;
    const input = new InputCreateEmployee(cpf, name, email, biography, password, type);
    
    await this.validateInput(input);

    const hashedPassword = await this.hashPassword(password);
    input.password = hashedPassword
    
    return new CreateEmployeeUseCase(employeeRepository).handle(input);
  }

  static async updateEmployee(
    params: any,
    body: any,
    query: any,
    headers: any,
    employeeRepository: EmployeeRepository
  ): Promise<OutputEmployee> {
    const { id } = params;
    const { name, email, biography, password, type } = body;
    const input = new InputUpdateEmployee(id, name, email, biography, password, type);
    
    await this.validateInput(input);

    if(password) {
      const hashedPassword = await this.hashPassword(password);
      input.password = hashedPassword;
    }
      
    return new UpdateEmployeeUseCase(employeeRepository).handle(input);
  }

  static async getAllEmployees(
    params: any,
    body: any,
    query: any,
    headers: any,
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
    headers: any,
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
    headers: any,
    employeeRepository: EmployeeRepository
  ): Promise<void> {
    const token = headers.authorization.split(" ")[1];
    const { targetID } = params;
    const sourceID = this.decodeIDFromToken(token)
    const input = new InputDeleteEmployee(sourceID, targetID);
    
    await this.validateInput(input);
    
    return new DeleteEmployeeUseCase(employeeRepository).handle(input);
  }
}
