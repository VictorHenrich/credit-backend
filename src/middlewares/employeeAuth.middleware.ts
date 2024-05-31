import { Request, Response, NextFunction } from 'express';
import { NestMiddleware } from '@nestjs/common';
import AuthenticationService from 'src/services/authentication.service';
import {
  JSONUnauthorizedResponse,
  JSONResponseProps,
} from 'src/utils/responses';
import RequestUtils from 'src/utils/request';
import { ValidatedTokenDataProps } from 'src/services/authentication.interfaces';
import Employee from 'src/models/employee.entity';

export default class EmployeeAuthMiddleware implements NestMiddleware {
  constructor(private authenticationService: AuthenticationService) {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token: string = request.headers.authorization;

      const data: ValidatedTokenDataProps<Employee> =
        await this.authenticationService.captureEmployeeData(token);

      request[RequestUtils.namePropDataToken] = data;

      next();
    } catch (error) {
      const unauthorizedResponse: JSONResponseProps<string> =
        new JSONUnauthorizedResponse();

      response
        .status(unauthorizedResponse.statusCode)
        .json(unauthorizedResponse);
    }
  }
}
