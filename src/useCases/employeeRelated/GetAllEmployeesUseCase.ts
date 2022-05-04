import { translateEmployeeType } from "../util/enumTranslators";
import BaseEmployeeRelatedUseCase from "./BaseEmployeeRelatedUseCase";
import { InputGetAllEmployees, OutputEmployee } from "./EmployeeIO";

export default class GetAllEmployeesUseCase extends BaseEmployeeRelatedUseCase {
  async handle(inputGetAllEmployees: InputGetAllEmployees): Promise<OutputEmployee[]> {
    const employees = await this.employeeRepository.getAll(inputGetAllEmployees.pageNumber, inputGetAllEmployees.pageSize);
    const outputEmployees: OutputEmployee[] = employees.map(employee => ({ id: employee.id, cpf: employee.cpf, name: employee.name, email: employee.email, biography: employee.biography, type: translateEmployeeType(employee.type) }))
    return outputEmployees;
  }
}