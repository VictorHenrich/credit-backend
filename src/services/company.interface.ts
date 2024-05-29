import { ModelUUIDProps } from './common.interfaces';

export interface CompanyBodyProps {
  companyName: string;
  fantasyName: string;
}

export interface CompanyEntityProps
  extends Partial<CompanyBodyProps>,
    ModelUUIDProps {}
