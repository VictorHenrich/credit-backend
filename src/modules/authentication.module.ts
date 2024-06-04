import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthenticationController from 'src/controllers/authentication.controller';
import AgentAuthMiddleware from 'src/middlewares/agentAuth.middleware';
import EmployeeAuthMiddleware from 'src/middlewares/employeeAuth.middleware';
import Agent from 'src/models/agent.entity';
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
export default class AuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AgentAuthMiddleware)
      .forRoutes({ path: '/agent', method: RequestMethod.GET });

    consumer
      .apply(EmployeeAuthMiddleware)
      .forRoutes({ path: '/auth/employee', method: RequestMethod.GET });
  }
}
