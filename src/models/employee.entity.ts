import { Entity, Column, ManyToOne } from 'typeorm';
import Loan from './loan.entity';
import Company from './company.entity';
import { UserBaseModel } from './base';

@Entity({
  name: 'employee',
})
export default class Employee extends UserBaseModel {
  @Column({ nullable: false, default: 0 })
  wage: number;

  @Column({ default: 0 })
  score: number;

  @ManyToOne(() => Loan, (loan: Loan) => loan.employees)
  loan: Loan;

  @ManyToOne(() => Company, (companye: Company) => companye.employees)
  company: Company;
}
