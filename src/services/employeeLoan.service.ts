import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import EmployeeLoan from 'src/models/employeeLoan.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import Loan from 'src/models/loan.entity';
import Employee from 'src/models/employee.entity';
import {
  MarginExceededError,
  EmployeeNotReleasedForLoanError,
} from 'src/utils/exceptions';
import {
  EmployeeLoanBodyProps,
  EmployeeLoanFindProps,
} from './employeeLoan.interfaces';

@Injectable()
export default class EmployeeLoanService {
  constructor(
    @InjectRepository(EmployeeLoan)
    private readonly employeeLoanRepository: Repository<EmployeeLoan>,

    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
  ) {}

  private validateSalaryMargin(employee: Employee, loanValue: number) {
    const maxLoanAmount: number = (employee.salary * 35) / 100;

    if (loanValue > maxLoanAmount)
      throw new MarginExceededError(employee, loanValue);
  }

  async findReleasedLoans({
    employee,
    findMany = true,
  }: EmployeeLoanFindProps): Promise<Loan | Loan[]> {
    const query: SelectQueryBuilder<Loan> = await this.loanRepository
      .createQueryBuilder('l')
      .where({ company: employee.company })
      .where('l.minSalary <= :minSalary', { minSalary: employee.salary })
      .where('l.minScore <= :minScore', { minScore: employee.score });

    if (findMany) {
      const loans: Loan[] = await query.getMany();

      if (!loans.length) throw new EmployeeNotReleasedForLoanError(employee);

      return loans;
    }

    const loan: Loan = await query.getOne();

    if (!loan) throw new EmployeeNotReleasedForLoanError(employee);

    return loan;
  }

  async performLoan({
    employee,
    value,
  }: EmployeeLoanBodyProps): Promise<EmployeeLoan> {
    this.validateSalaryMargin(employee, value);

    let loan: Loan | Loan[] = await this.findReleasedLoans({
      employee,
      findMany: false,
    });

    if (Array.isArray(loan)) [loan] = loan;

    const employeeLoan: EmployeeLoan = this.employeeLoanRepository.create({
      employee,
      loan,
      value,
    });

    await this.employeeLoanRepository.insert(employeeLoan);

    return employeeLoan;
  }
}
