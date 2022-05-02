import BaseEmployeeRelatedUseCase from "./BaseEmployeeRelatedUseCase";
import { InputGetEmployeeByID,  OutputEmployee} from "./EmployeeIO";

export default class GetEmployeeUseCase extends BaseEmployeeRelatedUseCase {
  async handleByID(inputGetEmployee: InputGetEmployeeByID): Promise<OutputEmployee | null> {
    const employee = await this.employeeRepository.getByID(inputGetEmployee.id);
    if(!employee) return null;
    const outputGetEmployee: OutputEmployee = { id: employee.id, cpf: employee.cpf, name: employee.name, email: employee.email, biography: employee.biography, type: employee.type };
    return outputGetEmployee;
  }
}