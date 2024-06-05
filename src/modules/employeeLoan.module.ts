import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import EmployeeAuthMiddleware from 'src/middlewares/employeeAuth.middleware';
import EmployeeLoanController from 'src/controllers/employeeLoan.controller';
import EmployeeLoanService from 'src/services/employeeLoan.service';
import EmployeeLoan from 'src/models/employeeLoan.entity';
import LoanService from 'src/services/loan.service';
import Loan from 'src/models/loan.entity';
import AuthenticationService from 'src/services/authentication.service';
import Employee from 'src/models/employee.entity';
import CompanyService from 'src/services/company.service';
import Agent from 'src/models/agent.entity';
import EmployeeService from 'src/services/employee.service';
import AgentService from 'src/services/agent.service';
import Company from 'src/models/company.entity';

@Module({
  controllers: [EmployeeLoanController],
  providers: [
    EmployeeLoanService,
    LoanService,
    AuthenticationService,
    CompanyService,
    EmployeeService,
    AgentService,
  ],
  imports: [
    TypeOrmModule.forFeature([EmployeeLoan, Loan, Employee, Agent, Company]),
    ClientsModule.register([
      {
        name: process.env.EMPLOYEE_LOAN_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: process.env.EMPLOYEE_LOAN_QUEUE_NAME,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export default class EmployeeLoansModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EmployeeAuthMiddleware)
      .forRoutes(
        { path: '/employee_loan/released', method: RequestMethod.GET },
        { path: '/employee_loan/all', method: RequestMethod.GET },
        { path: '/employee_loan/:loanUuid', method: RequestMethod.POST },
      );
  }
}
