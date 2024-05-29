import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CompanyController from 'src/controllers/company.controller';
import Company from 'src/models/company.entity';
import CompanyService from 'src/services/company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [TypeOrmModule.forFeature([Company])],
})
export default class CompaniesModule {}
