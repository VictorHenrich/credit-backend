import { IModelUUID } from './common.interfaces';

export interface IEmployeeBody {
  name: string;
  email: string;
  wage: number;
  score: number;
  username: string;
  password: string;
}

export interface IEmployeeEntity extends Partial<IEmployeeBody>, IModelUUID {}

export type IEmployeeAuth = Pick<
  IEmployeeEntity,
  'uuid' | 'username' | 'password'
>;
