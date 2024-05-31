import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Employee from 'src/models/employee.entity';
import { EmployeeBodyProps, EmployeeEntityProps } from './employee.interface';
import { ModelUUIDProps } from './common';
import CryptUtils from 'src/utils/crypt';
import { EmployeeNotFoundError } from 'src/utils/exceptions';

@Injectable()
export default class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(props: EmployeeBodyProps): Promise<Employee> {
    const password: string = await CryptUtils.createHash(props.password);

    return await this.employeeRepository.create({ ...props, password });
  }

  async updateEmployee({
    uuid,
    ...props
  }: Omit<EmployeeEntityProps, 'email' | 'password'>): Promise<Employee> {
    const employee: Employee = await this.findEmployee({ uuid });

    Object.assign(employee, props);

    await this.employeeRepository.save(employee);

    return employee;
  }

  async deleteEmployee({ uuid }: ModelUUIDProps): Promise<Employee> {
    const employee: Employee = await this.findEmployee({ uuid });

    await this.employeeRepository.remove(employee);

    return employee;
  }

  async findEmployee({ uuid }: ModelUUIDProps): Promise<Employee> {
    try {
      return await this.employeeRepository.findOneByOrFail({ uuid });
    } catch (error) {
      throw new EmployeeNotFoundError(uuid);
    }
  }

  async findManyEmployee(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }
}
