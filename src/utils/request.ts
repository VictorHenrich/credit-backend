import { Request } from 'express';
import Company from 'src/models/company.entity';

export default class RequestUtils {
  static getCompanyInTokenData(request: Request): Company {
    const company = request['tokenData'].company;

    return company;
  }
}
