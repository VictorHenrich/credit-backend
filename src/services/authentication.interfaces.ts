import { EmployeeEntityProps } from './employee.interface';

export type EmployeeAuthProps = Pick<
  EmployeeEntityProps,
  'uuid' | 'username' | 'password'
>;
