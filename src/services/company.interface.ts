import { ModelUUIDProps } from './common';

export interface CompanyBodyProps {
  companyName: string;
  fantasyName: string;
}

export interface CompanyEntityProps
  extends Partial<CompanyBodyProps>,
    ModelUUIDProps {}
