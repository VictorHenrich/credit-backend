import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Loan from 'src/models/loan.entity';
import { LoanBodyProps, LoanEntityProps } from './loan.interfaces';
import { LoanNotFoundError } from 'src/utils/exceptions';

type LoanFindingType = Pick<LoanEntityProps, 'uuid' | 'company'>;

@Injectable()
export default class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
  ) {}

  async findLoan({ uuid, company }: LoanFindingType) {
    try {
      return await this.loanRepository.findOneByOrFail({ uuid, company });
    } catch (error) {
      throw new LoanNotFoundError(uuid);
    }
  }

  async findMany({ company }: Pick<LoanBodyProps, 'company'>): Promise<Loan[]> {
    return await this.loanRepository.find({
      where: { company },
      relations: ['company'],
    });
  }

  async createLoan(props: LoanBodyProps): Promise<Loan> {
    const loan: Loan = this.loanRepository.create(props);

    await this.loanRepository.save(loan);

    return loan;
  }

  async updateLoan({
    uuid,
    company,
    ...props
  }: LoanEntityProps): Promise<Loan> {
    const loan: Loan = await this.findLoan({ uuid, company });

    Object.assign(loan, { ...props, company: undefined });

    await this.loanRepository.save(loan);

    return loan;
  }

  async deleteLoan({ uuid, company }: LoanFindingType): Promise<Loan> {
    const loan: Loan = await this.findLoan({ uuid, company });

    await this.loanRepository.delete({ uuid });

    return loan;
  }
}
