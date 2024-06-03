import { ApiProperty } from '@nestjs/swagger';
import { CompanyBodyProps } from 'src/services/company.interfaces';

export class CompanyBodyParams implements CompanyBodyProps {
  @ApiProperty()
  companyName: string;

  @ApiProperty()
  fantasyName: string;

  @ApiProperty()
  documentCNPJ: string;
}
