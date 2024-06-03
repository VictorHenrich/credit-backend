import BaseModel from 'src/models/base';
import Company from 'src/models/company.entity';

export interface UserAuthProps {
  email: string;
  password: string;
}

export interface TokenDataProps {
  companyUUID: string;
  userUUID: string;
  email: string;
  refreshToken: boolean;
}

export interface TokenDataResultProps {
  token: string;
  refreshToken: string;
}

export interface RefreshTokenDataResultProps
  extends Omit<TokenDataResultProps, 'refreshToken'> {}

export interface ValidatedTokenDataProps<T extends BaseModel>
  extends Omit<TokenDataProps, 'companyUUID' | 'userUUID' | 'refreshToken'> {
  company: Company;
  user: T;
}
