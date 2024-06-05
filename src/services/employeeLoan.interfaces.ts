import Employee from 'src/models/employee.entity';
import { UUIDModelProps } from './common';
import Loan from 'src/models/loan.entity';

export interface EmployeeLoanBodyProps {
  employee: Employee;
  loan: Loan;
  value: number;
}

export interface EmployeeLoanFindProps {
  employee: Employee;
  findMany?: boolean;
}

export interface EmployeeLoanEntityProps
  extends UUIDModelProps,
    EmployeeLoanBodyProps {}
