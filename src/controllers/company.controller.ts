import { Controller, Res, Get, Post, Put, Param, Body } from '@nestjs/common';
import { Response } from 'express';
import Company from 'src/models/company.entity';
import CompanyService from 'src/services/company.service';
import ResponseUtils from 'src/utils/responses';
import { CompanyNotFoundError } from 'src/utils/exceptions';
import { CompanyBodyParams } from './company.params';

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

      return ResponseUtils.handleSuccessCase<Company>(response, data);
    } catch (error) {
      return ResponseUtils.handleErrorCase(
        response,
        error,
        CompanyNotFoundError,
      );
    }
  }

  @Get()
  async findMany(@Res() response: Response): Promise<void> {
    const data: Company[] = await this.companyService.findManyCompany();

    return ResponseUtils.handleSuccessCase<Company[]>(response, data);
  }

  @Post()
  async create(
    @Res() response: Response,
    @Body('uuid') company: CompanyBodyParams,
  ): Promise<void> {
    const data: Company = await this.companyService.createCompany(company);

    return ResponseUtils.handleSuccessCase<Company>(response, data);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body('uuid') company: CompanyBodyParams,
    @Res() response: Response,
  ): Promise<void> {
    const data: Company = await this.companyService.updateCompany({
      uuid,
      ...company,
    });

    return ResponseUtils.handleSuccessCase<Company>(response, data);
  }
}
