import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import CompaniesModule from './modules/company.module';
import EmployeesModule from './modules/employee.module';
import LoansModule from './modules/loan.module';
import AuthenticationModule from './modules/authentication.module';
import AgentsModule from './modules/agent.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    CompaniesModule,
    EmployeesModule,
    LoansModule,
    AgentsModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
