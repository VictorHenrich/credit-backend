import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Response, Request } from 'express';
import EmployeeService from 'src/services/employee.service';
import { EmployeeBodyProps } from 'src/services/employee.interfaces';
import Employee from 'src/models/employee.entity';
import ResponseUtils from 'src/utils/responses';
import { EmployeeNotFoundError } from 'src/utils/exceptions';
import RequestUtils from 'src/utils/request';
import Company from 'src/models/company.entity';

@Controller('employee')
export default class EmployeeController {
  constructor(private employeerService: EmployeeService) {}

  @Get()
  async findMany(@Req() request, @Res() response: Response): Promise<void> {
    const company: Company = RequestUtils.getCompanyInTokenData(request);

    const data: Employee[] = await this.employeerService.findManyEmployee({
      company,
    });

    return ResponseUtils.handleSuccessCase<Employee[]>(response, data);
  }

  @Get(':uuid')
  async findOne(
    @Req() request,
    @Res() response: Response,
    @Param('uuid') uuid: string,
  ) {
    try {
      const company: Company = RequestUtils.getCompanyInTokenData(request);

      const data: Employee = await this.employeerService.findEmployee({
        uuid,
        company,
      });

      return ResponseUtils.handleSuccessCase<Employee>(response, data);
    } catch (error) {
      return ResponseUtils.handleErrorCase(
        response,
        error,
        EmployeeNotFoundError,
      );
    }
  }

  @Post()
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: Omit<EmployeeBodyProps, 'company'>,
  ): Promise<void> {
    const company: Company = RequestUtils.getCompanyInTokenData(request);

    const data: Employee = await this.employeerService.createEmployee({
      company,
      ...body,
    });

    return ResponseUtils.handleSuccessCase<Employee>(response, data);
  }

  @Put(':uuid')
  async update(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: Omit<EmployeeBodyProps, 'company'>,
    uuid: string,
  ): Promise<void> {
    try {
      const company: Company = RequestUtils.getCompanyInTokenData(request);

      const data: Employee = await this.employeerService.updateEmployee({
        company,
        uuid,
        ...body,
      });

      return ResponseUtils.handleSuccessCase<Employee>(response, data);
    } catch (error) {
      return ResponseUtils.handleErrorCase(
        response,
        error,
        EmployeeNotFoundError,
      );
    }
  }

  @Delete(':uuid')
  async delete(
    @Req() request: Request,
    @Res() response: Response,
    @Param('uuid') uuid: string,
  ) {
    try {
      const company: Company = RequestUtils.getCompanyInTokenData(request);

      const data: Employee = await this.employeerService.deleteEmployee({
        company,
        uuid,
      });

      return ResponseUtils.handleSuccessCase<Employee>(response, data);
    } catch (error) {
      return ResponseUtils.handleErrorCase(
        response,
        error,
        EmployeeNotFoundError,
      );
    }
  }
}
