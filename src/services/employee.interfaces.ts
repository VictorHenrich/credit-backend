import { CompanyModelProps, UUIDModelProps } from './common';

export interface EmployeeBodyProps extends CompanyModelProps {
  name: string;
  email: string;
  salary: number;
  score: number;
  password: string;
  documentCPF: string;
}

export interface EmployeeEntityProps
  extends Partial<EmployeeBodyProps>,
    UUIDModelProps {}
