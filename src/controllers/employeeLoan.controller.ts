import { Controller, Res, Get, Post, Put, Param, Body } from '@nestjs/common';
import { Response } from 'express';
import EmployeeLoanService from 'src/services/employeeLoan.service';

@Controller('employee_loan')
export default class EmployeeLoanController {
  constructor(private readonly employeeLoanService: EmployeeLoanService) {}

  @Post()
  async performLoan(): Promise<void> {}
}
