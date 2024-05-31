import { Entity, Column, ManyToOne } from 'typeorm';
import BaseModel from './base';
import Loan from './loan.entity';
import Employee from './employee.entity';

@Entity({
  name: 'employee_loan',
})
export default class EmployeeLoan extends BaseModel {
  @Column({ nullable: false })
  value: number;

  @ManyToOne(() => Employee, (employee: Employee) => employee.loans)
  employee: Employee;

  @ManyToOne(() => Loan, (loan: Loan) => loan.historic)
  loan: Loan;
}