import { ApiProperty } from '@nestjs/swagger';
import { EmployeeBodyProps } from "src/services/employee.interfaces";



export class EmployeeBodyParams implements Omit<EmployeeBodyProps, "company">{
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    salary: number;

    @ApiProperty()
    score: number;

    @ApiProperty()
    password: string;
    
    @ApiProperty()
    documentCPF: string;
}