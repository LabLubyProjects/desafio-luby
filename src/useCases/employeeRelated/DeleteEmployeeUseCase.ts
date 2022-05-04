import NotFoundError from "../errors/NotFoundError";
import InsufficientPermissionError from "../errors/InsufficientPermissionError";
import BaseEmployeeRelatedUseCase from "./BaseEmployeeRelatedUseCase";
import { InputDeleteEmployee } from "./EmployeeIO";

export default class DeleteEmployeeUseCase extends BaseEmployeeRelatedUseCase {
  async handle(inputDeleteEmployee: InputDeleteEmployee): Promise<void> {
    const sourceEmployee = await this.employeeRepository.getByID(inputDeleteEmployee.sourceEmployeeID);
    const targetEmployeeID = await this.employeeRepository.getByID(inputDeleteEmployee.targetEmployeeID);
    if(!sourceEmployee || !targetEmployeeID) throw new NotFoundError();
    if(sourceEmployee.id !== targetEmployeeID.id && !sourceEmployee.isAdmin()) throw new InsufficientPermissionError();

    await this.employeeRepository.delete(inputDeleteEmployee.targetEmployeeID);
  }
}