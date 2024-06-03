import { ApiProperty } from '@nestjs/swagger';
import {
  RefreshTokenDataResultProps,
  UserAuthProps,
} from 'src/services/authentication.interfaces';

export class UserAuthBodyParams implements UserAuthProps {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RefreshTokenBodyParams implements RefreshTokenDataResultProps {
  @ApiProperty()
  token: string;
}
