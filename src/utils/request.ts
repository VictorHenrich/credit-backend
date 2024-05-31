import { Request } from 'express';
import Agent from 'src/models/agent.entity';
import Company from 'src/models/company.entity';
import Employee from 'src/models/employee.entity';

export default class RequestUtils {
  static get namePropDataToken(): string {
    return 'tokenData';
  }

  static getCompanyInTokenData(request: Request): Company {
    const company = request[RequestUtils.namePropDataToken].company;

    return company;
  }

  static getAgentInTokenData(request: Request): Agent {
    const agent = request[RequestUtils.namePropDataToken].agent;

    return agent;
  }

  static getEmployeeInTokenData(request: Request): Employee {
    const employee = request[RequestUtils.namePropDataToken].employee;

    return employee;
  }
}
