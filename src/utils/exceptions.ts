export class CompanyNotFoundError extends Error {
  constructor(companyUuid: string) {
    super(`Company '${companyUuid}' was not found`);
  }
}
