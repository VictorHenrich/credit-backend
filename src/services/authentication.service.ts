import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Employee from 'src/models/employee.entity';
import CryptUtils from 'src/utils/crypt';
import EmployeeService from './employee.service';
import { EmployeeAuthProps } from './authentication.interfaces';
import { UserNotFoundError } from 'src/utils/exceptions';

@Injectable()
export default class AuthenticationService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    private readonly employeeService: EmployeeService,
  ) {}

  async changeEmployeeCredentials({
    uuid,
    username,
    password,
  }: EmployeeAuthProps): Promise<void> {
    const employee: Employee = await this.employeeService.findEmployee({
      uuid,
    });

    const passwordCrypted: string = await CryptUtils.createHash(password);

    employee.password = passwordCrypted;
    employee.username = username;

    await this.employeeRepository.save(employee);
  }

  async authenticateEmployee({
    username,
    password,
  }: Omit<EmployeeAuthProps, 'uuid'>): Promise<Employee> {
    let employee: Employee;

    try {
      employee = await this.employeeRepository.findOneByOrFail({ username });
    } catch (error) {
      throw new UserNotFoundError(username);
    }

    const passwordCrypted: string = await CryptUtils.createHash(password);

    await CryptUtils.compareHash(employee.password, passwordCrypted);

    return employee;
  }

  async validateToken(token: string): Promise<any> {}
}
