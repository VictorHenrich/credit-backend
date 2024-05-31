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

export class UserNotFoundError extends ModelNotFoundError {
  constructor(email: string) {
    super(email, 'User');
  }
}

export class InvalidPasswordError extends Error {
  constructor() {
    super(`Password is invalid`);
  }
}
