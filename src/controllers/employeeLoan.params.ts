import { ApiProperty } from '@nestjs/swagger';
import { EmployeeLoanBodyProps } from 'src/services/employeeLoan.interfaces';

export class EmployeeLoanBodyParams
  implements Omit<EmployeeLoanBodyProps, 'employee' | 'loan'>
{
  @ApiProperty()
  value: number;
}
