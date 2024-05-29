import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Employee from 'src/models/employee.entity';
import {
  IEmployeeBody,
  IEmployeeEntity,
  IEmployeeAuth,
} from './employee.interface';
import { ModelUUIDProps } from './common.interfaces';
import CryptUtils from 'src/utils/crypt';

@Injectable()
export default class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(props: IEmployeeBody): Promise<Employee> {
    const password: string = await CryptUtils.createHash(props.password);

    return await this.employeeRepository.create({ ...props, password });
  }

  async updateEmployee({
    uuid,
    ...props
  }: Omit<IEmployeeEntity, 'username' | 'password'>): Promise<void> {
    await this.employeeRepository.update({ uuid }, props);
  }

  async deleteEmployee({ uuid }: ModelUUIDProps): Promise<void> {
    await this.employeeRepository.delete({ uuid });
  }

  async findEmployee({ uuid }: ModelUUIDProps): Promise<Employee> {
    return await this.employeeRepository.findOneByOrFail({ uuid });
  }

  async findManyEmployee(): Promise<Employee[]> {
    return await this.employeeRepository.findBy({});
  }

  async changeAuth({ uuid, username, password }: IEmployeeAuth): Promise<void> {
    const passwordCrypted: string = await CryptUtils.createHash(password);

    await this.employeeRepository.update(
      { uuid },
      { username, password: passwordCrypted },
    );
  }

  async checkAuth({
    uuid,
    username,
    password,
  }: IEmployeeAuth): Promise<boolean> {
    const employee: Employee = await this.employeeRepository.findOneByOrFail({
      uuid,
      username,
    });

    return await CryptUtils.compareHash(password, employee.password);
  }
}
