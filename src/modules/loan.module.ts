import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import LoanController from 'src/controllers/loan.controller';
import Loan from 'src/models/loan.entity';
import LoanService from 'src/services/loan.service';
import AgentAuthMiddleware from 'src/middlewares/agentAuth.middleware';
import AuthenticationService from 'src/services/authentication.service';
import Employee from 'src/models/employee.entity';
import Company from 'src/models/company.entity';
import Agent from 'src/models/agent.entity';
import CompanyService from 'src/services/company.service';
import AgentService from 'src/services/agent.service';
import EmployeeService from 'src/services/employee.service';

@Module({
  controllers: [LoanController],
  providers: [
    LoanService,
    AuthenticationService,
    CompanyService,
    AgentService,
    EmployeeService,
  ],
  imports: [
    TypeOrmModule.forFeature([Loan]),
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([Company]),
    TypeOrmModule.forFeature([Agent]),
  ],
})
export default class LoansModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AgentAuthMiddleware)
      .forRoutes(
        { path: '/loan', method: RequestMethod.GET },
        { path: '/loan', method: RequestMethod.POST },
        { path: '/loan', method: RequestMethod.DELETE },
        { path: '/loan', method: RequestMethod.PUT },
      );
  }
}
