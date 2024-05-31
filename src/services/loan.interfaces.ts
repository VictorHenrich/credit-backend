import { CompanyModelProps, UUIDModelProps } from './common';

export interface LoanBodyProps extends CompanyModelProps {
  description: string;
  minScore: number;
  minWage: number;
  maxInstallments: number;
}

export interface LoanEntityProps extends LoanBodyProps, UUIDModelProps {}
