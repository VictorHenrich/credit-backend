import {
  Controller,
  Res,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import EmployeeService from 'src/services/employee.service';
import {
  EmployeeBodyProps,
  EmployeeEntityProps,
} from 'src/services/employee.interface';
import Employee from 'src/models/employee.entity';
import ResponseUtils from 'src/utils/responses';
import { EmployeeNotFoundError } from 'src/utils/exceptions';

@Controller('employee')
export default class EmployeeController {
  constructor(private employeerService: EmployeeService) {}

  @Get()
  async findMany(@Res() response: Response): Promise<void> {
    const data: Employee[] = await this.employeerService.findManyEmployee();

    return ResponseUtils.handleSuccessCase<Employee[]>(response, data);
  }

  @Get(':uuid')
  async findOne(@Res() response: Response, @Param('uuid') uuid: string) {
    try {
      const data: Employee = await this.employeerService.findEmployee({ uuid });

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
    @Res() response: Response,
    @Body() body: EmployeeBodyProps,
  ): Promise<void> {
    const data: Employee = await this.employeerService.createEmployee({
      ...body,
    });

    return ResponseUtils.handleSuccessCase<Employee>(response, data);
  }

  @Put(':uuid')
  async update(
    @Res() response: Response,
    @Body() body: EmployeeEntityProps,
    uuid: string,
  ): Promise<void> {
    try {
      const data: Employee = await this.employeerService.updateEmployee({
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
  async delete(@Res() response: Response, @Param('uuid') uuid: string) {
    try {
      const data: Employee = await this.employeerService.deleteEmployee({
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
