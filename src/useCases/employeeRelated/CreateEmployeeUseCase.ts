import EmployeeImpl from "@src/domain/employee/Employee";
import AlreadyExistsError from "../errors/AlreadyExistsError";
import BaseEmployeeRelatedUseCase from "./BaseEmployeeRelatedUseCase";
import { InputCreateEmployee, OutputEmployee } from "./EmployeeIO";

export default class CreateEmployeeUseCase extends BaseEmployeeRelatedUseCase {
  async handle(inputNewEmployee: InputCreateEmployee): Promise<OutputEmployee> {
    const getByCPF = await this.employeeRepository.getByCPF(inputNewEmployee.cpf);
    if(getByCPF) throw new AlreadyExistsError();

    const getByEmail = await this.employeeRepository.getByEmail(inputNewEmployee.email);
    if(getByEmail) throw new AlreadyExistsError();

    const inputCreateEmployee = new EmployeeImpl(inputNewEmployee.cpf, inputNewEmployee.name, inputNewEmployee.email, inputNewEmployee.biography, inputNewEmployee.password, inputNewEmployee.type);
    const newEmplyoee = await this.employeeRepository.create(inputCreateEmployee);
    const outputCreateEmployee: OutputEmployee = { id: newEmplyoee.id, cpf: newEmplyoee.cpf, name: newEmplyoee.name, email: newEmplyoee.email, biography: newEmplyoee.biography, type: newEmplyoee.type };
    return outputCreateEmployee;
  }
}