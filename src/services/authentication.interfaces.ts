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

export interface ValidatedTokenDataProps
  extends Omit<TokenDataProps, 'companyUUID'> {
  company: Company;
}
