import EmployeeRepository from '@src/domain/employee/EmployeeRepository';

export default class BaseEmployeeRelatedUseCase {
  constructor(public employeeRepository: EmployeeRepository) {}
}
