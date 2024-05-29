import { Entity, Column, OneToMany } from 'typeorm';
import Employee from './employee.entity';
import BaseModel from './model.base';

@Entity({
  name: 'company',
})
export default class Company extends BaseModel {
  @Column({ nullable: false })
  companyName: string;

  @Column({ nullable: false })
  fantasyName: string;

  @OneToMany(() => Employee, (employee: Employee) => employee.company)
  employees: Employee[];
}
