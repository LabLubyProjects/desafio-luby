import InsufficientPermissionError from "../errors/InsufficientPermissionError";
import NotFoundError from "../errors/NotFoundError";
import { translateEmployeeType } from "../util/enumTranslators";
import BaseEmployeeRelatedUseCase from "./BaseEmployeeRelatedUseCase";
import { InputUpdateEmployee, OutputEmployee } from "./EmployeeIO";

export default class UpdateEmployeeUseCase extends BaseEmployeeRelatedUseCase {
  async handle(inputUpdateEmployee: InputUpdateEmployee): Promise<OutputEmployee> {
    const employee = await this.employeeRepository.getByID(inputUpdateEmployee.id);
    if(!employee) throw new NotFoundError();

    const sourceEmployee = await this.employeeRepository.getByID(inputUpdateEmployee.sourceID);
    if(!sourceEmployee) throw new NotFoundError();
    if(employee.id !== sourceEmployee.id &&  !sourceEmployee.isAdmin()) throw new InsufficientPermissionError();
  
    if(inputUpdateEmployee.name) employee.name = inputUpdateEmployee.name;
    if(inputUpdateEmployee.email) employee.email = inputUpdateEmployee.email;
    if(inputUpdateEmployee.biography) employee.biography = inputUpdateEmployee.biography;
    if(inputUpdateEmployee.password) employee.password = inputUpdateEmployee.password;
    if(inputUpdateEmployee.type) employee.type = inputUpdateEmployee.type;

    const updatedEmployee = await this.employeeRepository.update(employee);
    const outputEmployee: OutputEmployee = { id: updatedEmployee.id, cpf: updatedEmployee.cpf, name: updatedEmployee.name, email: updatedEmployee.email, biography: updatedEmployee.biography, type: translateEmployeeType(updatedEmployee.type) };
    return outputEmployee
  }
}