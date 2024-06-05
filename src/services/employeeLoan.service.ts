import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import EmployeeLoan from 'src/models/employeeLoan.entity';
import { Repository } from 'typeorm';
import Loan from 'src/models/loan.entity';
import Employee from 'src/models/employee.entity';
import {
  MarginExceededError,
  EmployeeNotReleasedForLoanError,
  ScoreNotReachedError,
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

  private validateLoanForEmployee(
    employee: Employee,
    loan: Loan,
    numberInstallments: number,
  ) {
    if (
      employee.salary < loan.minSalary ||
      employee.score < loan.minScore ||
      numberInstallments > loan.maxInstallments
    )
      throw new ScoreNotReachedError(employee, loan);
  }

  async findManyLoans({
    employee,
  }: EmployeeLoanFindProps): Promise<EmployeeLoan[]> {
    return await this.employeeLoanRepository.find({
      where: { employee },
      relations: ['employee', 'loan'],
    });
  }

  async findReleasedLoans({
    employee,
  }: EmployeeLoanFindProps): Promise<Loan[]> {
    const loans: Loan[] = await this.loanRepository
      .createQueryBuilder('l')
      .innerJoinAndSelect('l.company', 'company')
      .where({ company: employee.company })
      .where('l.minSalary <= :minSalary', { minSalary: employee.salary })
      .where('l.minScore <= :minScore', { minScore: employee.score })
      .getMany();

    if (!loans.length) throw new EmployeeNotReleasedForLoanError(employee);

    return loans;
  }

  async performLoan({
    employee,
    loan,
    value,
    numberInstallments,
  }: EmployeeLoanBodyProps): Promise<EmployeeLoan> {
    this.validateSalaryMargin(employee, value);

    this.validateLoanForEmployee(employee, loan, numberInstallments);

    const employeeLoan: EmployeeLoan = this.employeeLoanRepository.create({
      employee,
      loan,
      value,
      numberInstallments,
    });

    await this.employeeLoanRepository.insert(employeeLoan);

    return employeeLoan;
  }
}
