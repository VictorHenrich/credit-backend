import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmployeeController from 'src/controllers/employee.controller';
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
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    AuthenticationService,
    AgentService,
    CompanyService,
  ],
  imports: [
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([Agent]),
    TypeOrmModule.forFeature([Company]),
  ],
})
export default class EmployeesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EmployeeAuthMiddleware)
      .forRoutes(
        { path: '/employee', method: RequestMethod.PUT },
        { path: '/employee', method: RequestMethod.DELETE },
      );

    consumer
      .apply(AgentAuthMiddleware)
      .forRoutes({ path: '/employee', method: RequestMethod.GET });
  }
}
