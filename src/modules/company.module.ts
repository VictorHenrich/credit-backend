import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CompanyController from 'src/controllers/company.controller';
import AgentAuthMiddleware from 'src/middlewares/agentAuth.middleware';
import Company from 'src/models/company.entity';
import CompanyService from 'src/services/company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [TypeOrmModule.forFeature([Company])],
})
export default class CompaniesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AgentAuthMiddleware).forRoutes({
      path: 'company',
      method: RequestMethod.PUT,
    });
  }
}
