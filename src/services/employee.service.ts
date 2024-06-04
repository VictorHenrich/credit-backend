import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Employee from 'src/models/employee.entity';
import { EmployeeBodyProps, EmployeeEntityProps } from './employee.interfaces';
import CryptUtils from 'src/utils/crypt';
import { EmployeeNotFoundError } from 'src/utils/exceptions';

type EmployeeFindingType = Pick<EmployeeEntityProps, 'uuid' | 'company'>;

@Injectable()
export default class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(props: EmployeeBodyProps): Promise<Employee> {
    delete props['uuid'];

    const password: string = await CryptUtils.createHash(props.password);

    const employee: Employee = this.employeeRepository.create({
      ...props,
      password,
    });

    await this.employeeRepository.save(employee);

    return employee;
  }

  async updateEmployee({
    uuid,
    company,
    ...props
  }: Omit<EmployeeEntityProps, 'email' | 'password'>): Promise<Employee> {
    const employee: Employee = await this.findEmployee({ uuid, company });

    Object.assign(employee, { ...props, company: undefined });

    await this.employeeRepository.save(employee);

    return employee;
  }

  async deleteEmployee({ uuid, company }: EmployeeFindingType): Promise<void> {
    await this.employeeRepository.delete({ uuid, company });
  }

  async findEmployee({
    uuid,
    company,
  }: EmployeeFindingType): Promise<Employee> {
    try {
      return await this.employeeRepository.findOneByOrFail({ uuid, company });
    } catch (error) {
      throw new EmployeeNotFoundError(uuid);
    }
  }

  async findManyEmployee({
    company,
  }: Pick<EmployeeBodyProps, 'company'>): Promise<Employee[]> {
    return await this.employeeRepository.find({ where: { company } });
  }
}
