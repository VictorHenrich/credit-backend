export class CompanyNotFoundError extends Error {
  constructor(companyUuid: string) {
    super(`Company '${companyUuid}' was not found`);
  }
}

export class EmployeeNotFoundError extends Error {
  constructor(employeeUuid: string) {
    super(`Employee '${employeeUuid}' was not found`);
  }
}

export class UserNotFoundError extends Error {
  constructor(username: string) {
    super(`Username not '${username}' was not found`);
  }
}

export class InvalidPasswordError extends Error {
  constructor() {
    super(`Password is invalid`);
  }
}
