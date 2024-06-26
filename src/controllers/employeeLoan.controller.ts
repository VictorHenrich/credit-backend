import { Controller, Res, Req, Post, Param, Body, Get } from '@nestjs/common';
import { Response, Request } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import Employee from 'src/models/employee.entity';
import Loan from 'src/models/loan.entity';
import EmployeeLoanService from 'src/services/employeeLoan.service';
import {
  LoanNotFoundError,
  MarginExceededError,
  ScoreNotReachedError,
} from 'src/utils/exceptions';
import RequestUtils from 'src/utils/request';
import ResponseUtils from 'src/utils/responses';
import { EmployeeLoanBodyParams } from './employeeLoan.params';
import LoanService from 'src/services/loan.service';
import EmployeeLoan from 'src/models/employeeLoan.entity';

@Controller('employee_loan')
export default class EmployeeLoanController {
  constructor(
    private readonly employeeLoanService: EmployeeLoanService,
    private readonly loanService: LoanService,
  ) {}

  @MessagePattern('transfer_loan_to_account')
  async transferLoanToAccount(@Payload() body: EmployeeLoan): Promise<void> {
    console.log('...ACESSANDO SERVIÇO DE MENSAGERIA...');
    console.log('Dados da Mensageria: ', body);

    await this.employeeLoanService.transferLoanToAccount(body);
  }

  @Get('released')
  async findReleasedLoans(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const employee: Employee = RequestUtils.getEmployeeInTokenData(request);

    try {
      const loans: Loan[] = await this.employeeLoanService.findReleasedLoans({
        employee,
      });

      ResponseUtils.handleSuccessCase<Loan[] | Loan>(response, loans);
    } catch (error) {
      ResponseUtils.handleErrorCase(
        response,
        error,
        LoanNotFoundError,
        MarginExceededError,
        ScoreNotReachedError,
      );
    }
  }

  @Get('all')
  async findMany(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const employee: Employee = RequestUtils.getEmployeeInTokenData(request);

    try {
      const loans: EmployeeLoan[] =
        await this.employeeLoanService.findManyLoans({
          employee,
        });

      ResponseUtils.handleSuccessCase<EmployeeLoan[]>(response, loans);
    } catch (error) {
      ResponseUtils.handleErrorCase(
        response,
        error,
        LoanNotFoundError,
        MarginExceededError,
        ScoreNotReachedError,
      );
    }
  }

  @Post(':loanUuid')
  async performLoan(
    @Req() request: Request,
    @Res() response: Response,
    @Param('loanUuid') uuid: string,
    @Body() body: EmployeeLoanBodyParams,
  ): Promise<void> {
    const employee: Employee = RequestUtils.getEmployeeInTokenData(request);

    try {
      const loan: Loan = await this.loanService.findLoan({
        uuid,
        company: employee.company,
      });

      await this.employeeLoanService.performLoan({ ...body, loan, employee });

      ResponseUtils.handleSuccessCase<null>(response);
    } catch (error) {
      ResponseUtils.handleErrorCase(
        response,
        error,
        LoanNotFoundError,
        MarginExceededError,
        ScoreNotReachedError,
      );
    }
  }
}
