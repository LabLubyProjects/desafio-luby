import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import CreateEmployeeUseCase from "@src/useCases/employeeRelated/CreateEmployeeUseCase";
import DeleteEmployeeUseCase from "@src/useCases/employeeRelated/DeleteEmployeeUseCase";
import { InputCreateEmployee, InputDeleteEmployee, InputGetAllEmployees, InputGetEmployeeWithRelations, InputLoginEmployee, InputUpdateEmployee, OutputEmployee, OutputGetEmployeeWithRelations } from "@src/useCases/employeeRelated/EmployeeIO";
import GetAllEmployeesUseCase from "@src/useCases/employeeRelated/GetAllEmployeesUseCase";
import GetEmployeeWithRelationsUseCase from "@src/useCases/employeeRelated/GetEmployeeWithRelationsUseCase";
import LoginEmployeeUseCase from "@src/useCases/employeeRelated/LoginEmployeeUseCase";
import UpdateEmployeeUseCase from "@src/useCases/employeeRelated/UpdateEmployeeUseCase";
import InvalidPasswordError from "../errors/InvalidPasswordError";
import BaseController, { ResponseID, ResponseJWT } from "./BaseController";

export default class EmployeeController extends BaseController {
  static async login(
    params: any,
    body: any,
    query: any,
    headers: any,
    employeeRepository: EmployeeRepository
  ): Promise<ResponseJWT> {
    const { email, password } = body;
    const input = new InputLoginEmployee(email, password);

    await BaseController.validateInput(input);

    const user = await (new LoginEmployeeUseCase(employeeRepository).handle(input));
    
    const passwordMatches = await BaseController.compareHashedPassword(password, user.password);

    if(!passwordMatches)
      throw new InvalidPasswordError();
    
    return {jwt: BaseController.generateJWT(user.id)};  
  }

  static async createEmployee(
    params: any,
    body: any,
    query: any,
    headers: any,
    employeeRepository: EmployeeRepository
  ): Promise<ResponseID> {
    const { cpf, name, email, biography, password, type } = body;
    const input = new InputCreateEmployee(cpf, name, email, biography, password, type);
    
    await BaseController.validateInput(input);

    const hashedPassword = await BaseController.hashPassword(password);
    input.password = hashedPassword
    
    return {id: await (new CreateEmployeeUseCase(employeeRepository).handle(input))};
  }

  static async updateEmployee(
    params: any,
    body: any,
    query: any,
    headers: any,
    employeeRepository: EmployeeRepository
  ): Promise<OutputEmployee> {
    const token = headers.authorization.split(" ")[1];
    const { id } = params;
    const sourceID = BaseController.decodeIDFromToken(token)
    const { name, email, biography, password, type } = body;
    const input = new InputUpdateEmployee(sourceID, id, name, email, biography, password, type);
    
    await BaseController.validateInput(input);

    if(password) {
      const hashedPassword = await BaseController.hashPassword(password);
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
    let input;

    if(page && size)
      input = new InputGetAllEmployees(Number.parseInt(page), Number.parseInt(size));
    else
      input = new InputGetAllEmployees();  
    
    await BaseController.validateInput(input);

    return new GetAllEmployeesUseCase(employeeRepository).handle(input);
  }

  static async getEmployeeWithRelations(
    params: any,
    body: any,
    query: any,
    headers: any,
    employeeRepository: EmployeeRepository
  ): Promise<OutputGetEmployeeWithRelations> {
    const { id } = params;
    const input = new InputGetEmployeeWithRelations(id);
    
    await BaseController.validateInput(input);
    
    return new GetEmployeeWithRelationsUseCase(employeeRepository).handle(input);
  }

  static async deleteEmployee(
    params: any,
    body: any,
    query: any,
    headers: any,
    employeeRepository: EmployeeRepository
  ): Promise<void> {
    const token = headers.authorization.split(" ")[1];
    const { id } = params;
    const sourceID = BaseController.decodeIDFromToken(token)
    const input = new InputDeleteEmployee(sourceID, id);
    
    await BaseController.validateInput(input);
    
    return new DeleteEmployeeUseCase(employeeRepository).handle(input);
  }
}
