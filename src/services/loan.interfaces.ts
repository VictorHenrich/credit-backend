import { CompanyModelProps, UUIDModelProps } from './common';

export interface LoanBodyProps extends CompanyModelProps {
  description: string;
  minScore: number;
  minSalary: number;
  maxInstallments: number;
}

export interface LoanEntityProps extends LoanBodyProps, UUIDModelProps {}
