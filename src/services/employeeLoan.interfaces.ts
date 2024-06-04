import Employee from 'src/models/employee.entity';
import { UUIDModelProps } from './common';

export interface EmployeeLoanBodyProps {
  employee: Employee;
  value: number;
}

export interface EmployeeLoanFindProps {
  employee: Employee;
  findMany?: boolean;
}

export interface EmployeeLoanEntityProps
  extends UUIDModelProps,
    EmployeeLoanBodyProps {}
