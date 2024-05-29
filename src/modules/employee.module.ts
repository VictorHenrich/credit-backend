import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Employee from 'src/models/employee.entity';
import EmployeeService from 'src/services/employee.service';

@Module({
  providers: [EmployeeService],
  imports: [TypeOrmModule.forFeature([Employee])],
})
export default class EmployeesModule {}
