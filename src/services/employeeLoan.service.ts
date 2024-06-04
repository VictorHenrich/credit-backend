import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import EmployeeLoan from 'src/models/employeeLoan.entity';
import { Repository } from 'typeorm';
import Loan from 'src/models/loan.entity';
import Employee from 'src/models/employee.entity';
import {
  MarginExceededError,
  ScoreNotReachedError,
} from 'src/utils/exceptions';
import { EmployeeLoanBodyProps } from './employeeLoan.interfaces';

@Injectable()
export default class EmployeeLoanService {
  constructor(
    @InjectRepository(EmployeeLoan)
    private readonly employeeLoanRepository: Repository<EmployeeLoan>,
  ) {}

  private validateSalaryMargin(employee: Employee, loanValue: number) {
    const maxLoanAmount: number = (employee.salary * 35) / 100;

    if (loanValue > maxLoanAmount)
      throw new MarginExceededError(employee, loanValue);
  }

  private validateScore(employee: Employee, loan: Loan) {
    if (employee.salary < loan.minSalary || employee.score < loan.minScore)
      throw new ScoreNotReachedError(employee, loan);
  }

  async performLoan({
    employee,
    loan,
    value,
  }: EmployeeLoanBodyProps): Promise<EmployeeLoan> {
    this.validateSalaryMargin(employee, value);
    this.validateScore(employee, loan);

    const employeeLoan: EmployeeLoan = this.employeeLoanRepository.create({
      employee,
      loan,
      value,
    });

    await this.employeeLoanRepository.save(employeeLoan);

    return employeeLoan;
  }
}
