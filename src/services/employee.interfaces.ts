import { ModelUUIDProps } from './common';

export interface EmployeeBodyProps {
  name: string;
  email: string;
  wage: number;
  score: number;
  password: string;
  documentCPF: string;
}

export interface EmployeeEntityProps
  extends Partial<EmployeeBodyProps>,
    ModelUUIDProps {}
