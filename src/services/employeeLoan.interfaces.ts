import Employee from 'src/models/employee.entity';
import Loan from 'src/models/loan.entity';
import { UUIDModelProps } from './common';

export interface EmployeeLoanBodyProps {
  employee: Employee;
  loan: Loan;
  value: number;
}

export interface EmployeeLoanEntityProps
  extends UUIDModelProps,
    EmployeeLoanBodyProps {}
