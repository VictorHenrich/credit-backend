import {
  Controller,
  Res,
  Req,
  Post,
  Param,
  Body,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { Response, Request } from 'express';
import Company from 'src/models/company.entity';
import Loan from 'src/models/loan.entity';
import LoanService from 'src/services/loan.service';
import RequestUtils from 'src/utils/request';
import ResponseUtils from 'src/utils/responses';
import { LoanNotFoundError } from 'src/utils/exceptions';
import { LoanBodyProps } from 'src/services/loan.interfaces';

@Controller('loan')
export default class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get(':uuid')
  async findOne(
    @Req() request: Request,
    @Res() response: Response,
    @Param('uuid') uuid: string,
  ): Promise<void> {
    const company: Company = RequestUtils.getCompanyInTokenData(request);

    try {
      const data: Loan = await this.loanService.findLoan({ uuid, company });

      ResponseUtils.handleSuccessCase<Loan>(response, data);
    } catch (error) {
      ResponseUtils.handleErrorCase(response, error, LoanNotFoundError);
    }
  }

  @Get()
  async findMany(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const company: Company = RequestUtils.getCompanyInTokenData(request);

    const data: Loan[] = await this.loanService.findMany({ company });

    ResponseUtils.handleSuccessCase<Loan[]>(response, data);
  }

  @Post()
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: LoanBodyProps,
  ): Promise<void> {
    const company: Company = RequestUtils.getCompanyInTokenData(request);

    const data: Loan = await this.loanService.createLoan({ ...body, company });

    ResponseUtils.handleSuccessCase<Loan>(response, data);
  }

  @Put(':uuid')
  async update(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: LoanBodyProps,
    @Param('uuid') uuid: string,
  ): Promise<void> {
    const company: Company = RequestUtils.getCompanyInTokenData(request);

    try {
      const data: Loan = await this.loanService.updateLoan({
        ...body,
        uuid,
        company,
      });

      ResponseUtils.handleSuccessCase<Loan>(response, data);
    } catch (error) {
      ResponseUtils.handleErrorCase(response, error, LoanNotFoundError);
    }
  }

  @Delete(':uuid')
  async delete(
    @Req() request: Request,
    @Res() response: Response,
    @Param('uuid') uuid: string,
  ): Promise<void> {
    const company: Company = RequestUtils.getCompanyInTokenData(request);

    try {
      const data: Loan = await this.loanService.deleteLoan({ uuid, company });

      ResponseUtils.handleSuccessCase<Loan>(response, data);
    } catch (error) {
      ResponseUtils.handleErrorCase(response, error, LoanNotFoundError);
    }
  }
}
