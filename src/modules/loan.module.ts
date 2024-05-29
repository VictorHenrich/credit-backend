import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Loan from 'src/models/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan])],
})
export default class LoansModule {}
