import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Loan from 'src/models/loan.entity';



@Injectable()
export default class LoanService{
    constructor(
        @InjectRepository(Loan)
        private loanRepository: Repository<Loan>
    ){}

    async createLoan(): Promise<Loan>{
        return await this.loanRepository.create();
    }
}