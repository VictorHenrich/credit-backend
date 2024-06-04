import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmployeeAuthMiddleware from 'src/middlewares/employeeAuth.middleware';
import EmployeeLoanController from 'src/controllers/employeeLoan.controller';
import EmployeeLoanService from 'src/services/employeeLoan.service';
import EmployeeLoan from 'src/models/employeeLoan.entity';
import LoanService from 'src/services/loan.service';
import Loan from 'src/models/loan.entity';

@Module({
  controllers: [EmployeeLoanController],
  providers: [EmployeeLoanService, LoanService],
  imports: [TypeOrmModule.forFeature([EmployeeLoan, Loan])],
})
export default class EmployeeLoansModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EmployeeAuthMiddleware)
      .forRoutes(
        { path: '/employee_loan', method: RequestMethod.GET },
        { path: '/employee_loan', method: RequestMethod.POST },
      );
  }
}
