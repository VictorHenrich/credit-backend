import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import Employee from './employee.entity';
import BaseModel from './base';
import Company from './company.entity';

@Entity({
  name: 'loan',
})
export default class Loan extends BaseModel {
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, default: 0 })
  minScore: number;

  @Column({ nullable: false, default: 0 })
  minWage: number;

  @Column({ nullable: false })
  maxInstallments: number;

  @OneToMany(() => Employee, (employee: Employee) => employee.loan)
  employees: Employee[];

  @ManyToOne(() => Company, (companye: Company) => companye.loans)
  company: Company;
}
