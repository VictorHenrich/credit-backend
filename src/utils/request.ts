import { Request } from 'express';
import Agent from 'src/models/agent.entity';
import Company from 'src/models/company.entity';
import Employee from 'src/models/employee.entity';
import { ValidatedTokenDataProps } from 'src/services/authentication.interfaces';

export default class RequestUtils {
  static get namePropDataToken(): string {
    return process.env.TOKEN_DATA_PROP_NAME;
  }

  static getCompanyInTokenData(request: Request): Company {
    const { company }: ValidatedTokenDataProps<Agent> =
      request[RequestUtils.namePropDataToken];

    return company;
  }

  static getAgentInTokenData(request: Request): Agent {
    const { user: agent }: ValidatedTokenDataProps<Agent> =
      request[RequestUtils.namePropDataToken];

    return agent;
  }

  static getEmployeeInTokenData(request: Request): Employee {
    const { user: employee }: ValidatedTokenDataProps<Employee> =
      request[RequestUtils.namePropDataToken];

    return employee;
  }

  static getTokenData(
    request: Request,
  ): ValidatedTokenDataProps<Agent | Employee> {
    return request[RequestUtils.namePropDataToken];
  }
}
