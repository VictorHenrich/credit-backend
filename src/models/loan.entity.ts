import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import BaseModel from './base';
import Company from './company.entity';
import EmployeeLoan from './employeeLoan.entity';

@Entity({
  name: 'loan',
})
export default class Loan extends BaseModel {
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, default: 0 })
  minScore: number;

  @Column({ nullable: false, default: 0 })
  minSalary: number;

  @Column({ nullable: false })
  maxInstallments: number;

  @OneToMany(() => EmployeeLoan, (employee: EmployeeLoan) => employee.loan)
  @JoinColumn()
  historic: EmployeeLoan[];

  @ManyToOne(() => Company, (companye: Company) => companye.loans)
  @JoinColumn()
  company: Company;
}
