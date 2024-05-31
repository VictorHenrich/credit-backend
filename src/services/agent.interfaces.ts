import { CompanyModelProps, UUIDModelProps } from './common';

export interface AgentBodyProps extends CompanyModelProps {
  name: string;
  email: string;
  password: string;
  documentCPF: string;
}

export interface AgentEntityProps extends AgentBodyProps, UUIDModelProps {}
