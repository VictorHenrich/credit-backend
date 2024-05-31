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
}

export interface ValidatedTokenDataProps<T extends BaseModel>
  extends Omit<TokenDataProps, 'companyUUID' | 'userUUID'> {
  company: Company;
  user: T;
}
