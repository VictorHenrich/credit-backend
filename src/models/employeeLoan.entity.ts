import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import BaseModel from './base';
import Loan from './loan.entity';
import Employee from './employee.entity';
import { EmployeeLoanStatusType } from 'src/utils/types';

@Entity({
  name: 'employee_loan',
})
export default class EmployeeLoan extends BaseModel {
  @Column({ nullable: false })
  value: number;

  @Column({ nullable: false })
  numberInstallments: number;

  @Column({ nullable: false, default: EmployeeLoanStatusType.PROGRESS })
  status: string;

  @Column({ nullable: false, default: () => 'current_date' })
  created: Date;

  @ManyToOne(() => Employee, (employee: Employee) => employee.loans)
  @JoinColumn()
  employee: Employee;

  @ManyToOne(() => Loan, (loan: Loan) => loan.historic)
  @JoinColumn()
  loan: Loan;
}
