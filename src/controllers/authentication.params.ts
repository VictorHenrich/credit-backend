import { ApiProperty } from '@nestjs/swagger';
import { UserAuthProps } from 'src/services/authentication.interfaces';



export class UserAuthBodyParams implements UserAuthProps{
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}