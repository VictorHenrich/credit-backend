import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import LoanController from 'src/controllers/loan.controller';
import Loan from 'src/models/loan.entity';
import LoanService from 'src/services/loan.service';
import AgentAuthMiddleware from 'src/middlewares/agentAuth.middleware';

@Module({
  controllers: [LoanController],
  providers: [LoanService],
  imports: [TypeOrmModule.forFeature([Loan])],
})
export default class LoansModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AgentAuthMiddleware);
  }
}
