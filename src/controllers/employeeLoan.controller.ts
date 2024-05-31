import { Controller, Res, Req, Post, Param, Body } from '@nestjs/common';
import { Response, Request } from 'express';
import Company from 'src/models/company.entity';
import Employee from 'src/models/employee.entity';
import Loan from 'src/models/loan.entity';
import { EmployeeLoanBodyProps } from 'src/services/employeeLoan.interfaces';
import EmployeeLoanService from 'src/services/employeeLoan.service';
import LoanService from 'src/services/loan.service';
import {
  LoanNotFoundError,
  MarginExceededError,
  ScoreNotReachedError,
} from 'src/utils/exceptions';
import RequestUtils from 'src/utils/request';
import ResponseUtils from 'src/utils/responses';

@Controller('employee_loan')
export default class EmployeeLoanController {
  constructor(
    private readonly employeeLoanService: EmployeeLoanService,
    private readonly loanService: LoanService,
  ) {}

  @Post(':loanUuid')
  async performLoan(
    @Req() request: Request,
    @Res() response: Response,
    @Param('loanUuid') uuid: string,
    @Body() body: Omit<EmployeeLoanBodyProps, 'employee' | 'loan'>,
  ): Promise<void> {
    const company: Company = RequestUtils.getCompanyInTokenData(request);

    const employee: Employee = RequestUtils.getEmployeeInTokenData(request);

    try {
      const loan: Loan = await this.loanService.findLoan({ uuid, company });

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
