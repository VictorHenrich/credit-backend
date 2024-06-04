import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Agent from 'src/models/agent.entity';
import CompanyController from 'src/controllers/company.controller';
import AgentAuthMiddleware from 'src/middlewares/agentAuth.middleware';
import Company from 'src/models/company.entity';
import Employee from 'src/models/employee.entity';
import AgentService from 'src/services/agent.service';
import AuthenticationService from 'src/services/authentication.service';
import CompanyService from 'src/services/company.service';
import EmployeeService from 'src/services/employee.service';

@Module({
  controllers: [CompanyController],
  providers: [
    CompanyService,
    AuthenticationService,
    EmployeeService,
    AgentService,
  ],
  imports: [
    TypeOrmModule.forFeature([Company]),
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([Agent]),
  ],
})
export default class CompaniesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AgentAuthMiddleware).forRoutes({
      path: '/company',
      method: RequestMethod.PUT,
    });
  }
}
