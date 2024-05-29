import { Controller, Res, Get, Post, Put, Param, Body } from '@nestjs/common';
import { Response } from 'express';
import Company from 'src/models/company.entity';
import CompanyService from 'src/services/company.service';
import { CompanyBodyProps } from 'src/services/company.interface';
import {
  JSONSuccessResponse,
  JSONErrorResponse,
  JSONResponseProps,
} from 'src/utils/responses';
import { CompanyNotFoundError } from 'src/utils/exceptions';

@Controller('company')
export default class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get(':uuid')
  async findOne(
    @Param('uuid') uuid: string,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const data: Company = await this.companyService.findCompany({ uuid });

      const successResponse: JSONResponseProps<Company> =
        new JSONSuccessResponse({ data });

      response.status(successResponse.statusCode).json(successResponse);
    } catch (error) {
      if (error instanceof CompanyNotFoundError) {
        const errorResponse: JSONResponseProps<string> = new JSONErrorResponse({
          data: error.message,
        });

        response.status(errorResponse.statusCode).json(errorResponse);

        return;
      }

      throw new error();
    }
  }

  @Get()
  async findMany(@Res() response: Response): Promise<void> {
    try {
      const data: Company[] = await this.companyService.findManyCompany();

      const successResponse: JSONResponseProps<Company[]> =
        new JSONSuccessResponse({ data });

      response.status(successResponse.statusCode).json(successResponse);
    } catch (error) {
      if (error instanceof CompanyNotFoundError) {
        const errorResponse: JSONResponseProps<string> = new JSONErrorResponse({
          data: error.message,
        });

        response.status(errorResponse.statusCode).json(errorResponse);

        return;
      }

      throw new error();
    }
  }

  @Post()
  async create(
    @Res() response: Response,
    @Body('uuid') company: CompanyBodyProps,
  ): Promise<void> {
    const data: Company = await this.companyService.createCompany(company);

    const successResponse: JSONResponseProps<Company[]> =
      new JSONSuccessResponse({ data });

    response.status(successResponse.statusCode).json(successResponse);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body('uuid') company: CompanyBodyProps,
    @Res() response: Response,
  ): Promise<void> {
    const data: Company = await this.companyService.updateCompany({
      uuid,
      ...company,
    });

    const successResponse: JSONResponseProps<Company[]> =
      new JSONSuccessResponse({ data });

    response.status(successResponse.statusCode).json(successResponse);
  }
}
