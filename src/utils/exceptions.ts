import Employee from 'src/models/employee.entity';
import Loan from 'src/models/loan.entity';

export abstract class ModelNotFoundError extends Error {
  constructor(value: string, modelName: string) {
    super(`${modelName} '${value}' was not found`);
  }
}

export class CompanyNotFoundError extends ModelNotFoundError {
  constructor(uuid: string) {
    super(uuid, 'Company');
  }
}

export class EmployeeNotFoundError extends ModelNotFoundError {
  constructor(uuid: string) {
    super(uuid, 'Employee');
  }
}

export class AgentNotFoundError extends ModelNotFoundError {
  constructor(uuid: string) {
    super(uuid, 'Agent');
  }
}

export class LoanNotFoundError extends ModelNotFoundError {
  constructor(uuid: string) {
    super(uuid, 'Loan');
  }
}

export class UserNotFoundError extends ModelNotFoundError {
  constructor(email: string) {
    super(email, 'User');
  }
}

export class InvalidPasswordError extends Error {
  constructor() {
    super(`Password is invalid!`);
  }
}

export class InvalidTokenError extends Error {
  constructor(token: string) {
    super(`Token '${token}' is invalid!`);
  }
}

export class MarginExceededError extends Error {
  constructor(employee: Employee, loanValue: number) {
    super(
      `Loan requested ${loanValue} by employee ${employee.uuid} exceeds the established margin!`,
    );
  }
}

export class ScoreNotReachedError extends Error {
  constructor(employee: Employee, loan: Loan) {
    super(
      `Score ${employee.score} did not reach the defined minimum value ${loan.minScore}`,
    );
  }
}
