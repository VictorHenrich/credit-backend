import { Entity, Column, OneToMany } from 'typeorm';
import Employee from './employee.entity';
import BaseModel from './model.base';

@Entity({
  name: 'loan',
})
export default class Loan extends BaseModel {
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, default: 0 })
  minimumScore: number;

  @OneToMany(() => Employee, (employee: Employee) => employee.loan)
  employees: Employee[];
}
