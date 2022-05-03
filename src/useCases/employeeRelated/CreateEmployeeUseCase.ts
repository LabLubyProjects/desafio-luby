import EmployeeImpl from "@src/domain/employee/Employee";
import AlreadyExistsError from "../errors/AlreadyExistsError";
import BaseEmployeeRelatedUseCase from "./BaseEmployeeRelatedUseCase";
import { InputCreateEmployee } from "./EmployeeIO";

export default class CreateEmployeeUseCase extends BaseEmployeeRelatedUseCase {
  async handle(inputNewEmployee: InputCreateEmployee): Promise<string> {
    const getByCPF = await this.employeeRepository.getByCPF(inputNewEmployee.cpf);
    if(getByCPF) throw new AlreadyExistsError();

    const getByEmail = await this.employeeRepository.getByEmail(inputNewEmployee.email);
    if(getByEmail) throw new AlreadyExistsError();

    const inputCreateEmployee = new EmployeeImpl(inputNewEmployee.cpf, inputNewEmployee.name, inputNewEmployee.email, inputNewEmployee.biography, inputNewEmployee.password, inputNewEmployee.type);
    const newEmplyoeeID = await this.employeeRepository.create(inputCreateEmployee);
    return newEmplyoeeID;
  }
}