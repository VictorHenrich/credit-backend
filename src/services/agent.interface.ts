import { ModelUUIDProps } from './common';

export interface AgentBodyProps {
  name: string;
  email: string;
  password: string;
  documentCPF: string;
}

export interface AgentEntityProps
  extends Partial<AgentBodyProps>,
    ModelUUIDProps {}
