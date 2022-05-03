import { EmployeeType } from "@src/domain/employee/Employee";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";
import BaseEmployeeRelatedUseCase from "./BaseEmployeeRelatedUseCase";
import { InputDeleteEmployee } from "./EmployeeIO";

export default class DeleteEmployeeUseCase extends BaseEmployeeRelatedUseCase {
  async handle(inputDeleteEmployee: InputDeleteEmployee): Promise<void> {
    const sourceEmployee = await this.employeeRepository.getByID(inputDeleteEmployee.sourceEmployeeID);
    const targetEmployeeID = await this.employeeRepository.getByID(inputDeleteEmployee.targetEmployeeID);
    if(!sourceEmployee || !targetEmployeeID) throw new NotFoundError();
    if(sourceEmployee.type !== EmployeeType.ADMIN) throw new UnauthorizedError();

    await this.employeeRepository.delete(inputDeleteEmployee.targetEmployeeID);
  }
}