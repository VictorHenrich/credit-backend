import { ApiProperty } from '@nestjs/swagger';
import { LoanBodyProps } from "src/services/loan.interfaces";



export class LoanBodyParams implements Omit<LoanBodyProps, "company">{
    @ApiProperty()
    description: string;

    @ApiProperty()
    minScore: number;

    @ApiProperty()
    minSalary: number;

    @ApiProperty()
    maxInstallments: number;
}