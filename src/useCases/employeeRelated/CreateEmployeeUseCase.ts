import EmployeeImpl from "@src/domain/employee/Employee";
import BaseEmployeeRelatedUseCase from "./BaseEmployeeRelatedUseCase";
import { InputCreateEmployee, OutputCreateEmployee } from "./EmployeeIO";

export default class CreateEmployeeUseCase extends BaseEmployeeRelatedUseCase {
  async handle(inputNewEmployee: InputCreateEmployee): Promise<OutputCreateEmployee> {
    const inputCreateEmployee = new EmployeeImpl(inputNewEmployee.cpf, inputNewEmployee.name, inputNewEmployee.email, inputNewEmployee.biography, inputNewEmployee.password, inputNewEmployee.type);
    const newEmplyoee = await this.employeeRepository.create(inputCreateEmployee);
    const outputCreateEmployee: OutputCreateEmployee = { id: newEmplyoee.id, cpf: newEmplyoee.cpf, name: newEmplyoee.name, email: newEmplyoee.email, biography: newEmplyoee.biography, type: newEmplyoee.type };
    return outputCreateEmployee;
  }
}