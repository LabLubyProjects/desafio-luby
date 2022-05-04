import EmployeeRepository from "@src/domain/employee/EmployeeRepository";
import CreateEmployeeUseCase from "@src/useCases/employeeRelated/CreateEmployeeUseCase";
import DeleteEmployeeUseCase from "@src/useCases/employeeRelated/DeleteEmployeeUseCase";
import { InputCreateEmployee, InputDeleteEmployee, InputGetEmployeeByID, OutputEmployee } from "@src/useCases/employeeRelated/EmployeeIO";
import GetAllEmployeesUseCase from "@src/useCases/employeeRelated/GetAllEmployeesUseCase";
import GetEmployeeByIDUseCase from "@src/useCases/employeeRelated/GetEmployeeByIDUseCase";

export default class EmployeeController {
  static createEmployee(
    params: any,
    body: any,
    query: any,
    employeeRepository: EmployeeRepository
  ): Promise<string> {
    const { cpf, name, email, biography, password, type } = body;
    const input: InputCreateEmployee = {cpf, name, email, biography, password, type}; 
    return new CreateEmployeeUseCase(employeeRepository).handle(input);
  }

  static getAllEmployees(
    params: any,
    body: any,
    query: any,
    employeeRepository: EmployeeRepository
  ): Promise<OutputEmployee[]> { 
    return new GetAllEmployeesUseCase(employeeRepository).handle();
  }

  static getEmployeesByID(
    params: any,
    body: any,
    query: any,
    employeeRepository: EmployeeRepository
  ): Promise<OutputEmployee> {
    const { id } = params;
    const input: InputGetEmployeeByID = {id}; 
    return new GetEmployeeByIDUseCase(employeeRepository).handle(input);
  }

  static deleteEmployee(
    params: any,
    body: any,
    query: any,
    employeeRepository: EmployeeRepository
  ): Promise<void> {
    const { sourceID, targetID } = params;
    const input: InputDeleteEmployee = {sourceEmployeeID: sourceID, targetEmployeeID: targetID}; 
    return new DeleteEmployeeUseCase(employeeRepository).handle(input);
  }
}
