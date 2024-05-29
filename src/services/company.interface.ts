import { IModelUUID } from './common.interfaces';

export interface ICompanyBody {
  companyName: string;
  fantasyName: string;
}

export interface ICompanyEntity extends Partial<ICompanyBody>, IModelUUID {}
