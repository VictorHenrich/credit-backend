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
import Employee from 'src/models/employee.entity';
import EmployeeService from 'src/services/employee.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [TypeOrmModule.forFeature([Employee])],
})
export default class EmployeesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EmployeeAuthMiddleware)
      .forRoutes(
        { path: 'employee', method: RequestMethod.PUT },
        { path: 'employee', method: RequestMethod.DELETE },
      );

    consumer
      .apply(AgentAuthMiddleware)
      .forRoutes({ path: 'employee', method: RequestMethod.GET });
  }
}
