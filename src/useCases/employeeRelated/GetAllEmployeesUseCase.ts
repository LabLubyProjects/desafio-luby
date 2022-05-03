import BaseEmployeeRelatedUseCase from "./BaseEmployeeRelatedUseCase";
import { OutputEmployee } from "./EmployeeIO";

export default class GetAllEmployeesUseCase extends BaseEmployeeRelatedUseCase {
  async handle(): Promise<OutputEmployee[]> {
    const employees = await this.employeeRepository.getAll();
    const outputEmployees: OutputEmployee[] = employees.map(employee => ({ id: employee.id, cpf: employee.cpf, name: employee.name, email: employee.email, biography: employee.biography, type: employee.type }))
    return outputEmployees;
  }
}