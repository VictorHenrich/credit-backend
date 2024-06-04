import { Entity, Column, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import EmployeeLoan from './employeeLoan.entity';
import Company from './company.entity';
import { UserBaseModel } from './base';

@Entity({
  name: 'employee',
})
export default class Employee extends UserBaseModel {
  @Column({ nullable: false, default: 0 })
  salary: number;

  @Column({ default: 0 })
  score: number;

  @ManyToMany(() => EmployeeLoan, (loan: EmployeeLoan) => loan.employee)
  @JoinColumn()
  loans: EmployeeLoan[];

  @ManyToOne(() => Company, (companye: Company) => companye.employees)
  @JoinColumn()
  company: Company;
}
