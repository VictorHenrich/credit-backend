import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from 'http';
import AuthenticationController from 'src/controllers/authentication.controller';
import Company from 'src/models/company.entity';
import Employee from 'src/models/employee.entity';
import AgentService from 'src/services/agent.service';
import AuthenticationService from 'src/services/authentication.service';
import CompanyService from 'src/services/company.service';
import EmployeeService from 'src/services/employee.service';

@Module({
  providers: [
    AuthenticationService,
    AgentService,
    CompanyService,
    EmployeeService,
  ],
  controllers: [AuthenticationController],
  imports: [TypeOrmModule.forFeature([Employee, Agent, Company])],
})
export default class AuthenticationModule {}
