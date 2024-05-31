import { ModelUUIDProps } from './common';

export interface EmployeeBodyProps {
  name: string;
  email: string;
  wage: number;
  score: number;
  username: string;
  password: string;
}

export interface EmployeeEntityProps
  extends Partial<EmployeeBodyProps>,
    ModelUUIDProps {}
