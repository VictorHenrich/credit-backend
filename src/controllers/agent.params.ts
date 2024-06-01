import { ApiProperty } from '@nestjs/swagger';
import { AgentBodyProps } from 'src/services/agent.interfaces';


export class AgentBodyParams implements Omit<AgentBodyProps, "company">{
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    documentCPF: string;
}