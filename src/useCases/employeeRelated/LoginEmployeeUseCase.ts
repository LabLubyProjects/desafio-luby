import NotFoundError from '../errors/NotFoundError';
import BaseEmployeeRelatedUseCase from './BaseEmployeeRelatedUseCase';
import { InputLoginEmployee, OutputLoginEmployee } from './EmployeeIO';

export default class LoginEmployeeUseCase extends BaseEmployeeRelatedUseCase {
  async handle(
    inputLoginEmployee: InputLoginEmployee
  ): Promise<OutputLoginEmployee> {
    const employee = await this.employeeRepository.getByEmail(
      inputLoginEmployee.email
    );
    if (!employee) throw new NotFoundError();
    const outputEmployee: OutputLoginEmployee = {
      id: employee.id,
      email: employee.email,
      password: employee.password,
    };
    return outputEmployee;
  }
}
