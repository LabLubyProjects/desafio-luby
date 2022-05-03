import NotFoundError from "../errors/NotFoundError";
import BaseEmployeeRelatedUseCase from "./BaseEmployeeRelatedUseCase";
import { InputGetEmployeeByID,  OutputEmployee} from "./EmployeeIO";

export default class GetEmployeeByIDUseCase extends BaseEmployeeRelatedUseCase {
  async handle(inputGetEmployee: InputGetEmployeeByID): Promise<OutputEmployee> {
    const employee = await this.employeeRepository.getByID(inputGetEmployee.id);
    if(!employee) throw new NotFoundError();
    const outputEmployee: OutputEmployee = { id: employee.id, cpf: employee.cpf, name: employee.name, email: employee.email, biography: employee.biography, type: employee.type };
    return outputEmployee;
  }
}