import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Employee from 'src/models/employee.entity';
import EmployeeService from 'src/services/employee.service';

@Module({
  controllers: [EmployeeService],
  imports: [
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forRoot({
      migrate: true,
      migrations: [Employee],
    }),
  ],
})
export default class EmployeesModule {}
