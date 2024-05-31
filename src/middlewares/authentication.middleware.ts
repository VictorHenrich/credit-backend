import { Request, Response, NextFunction } from 'express';
import { NestMiddleware } from '@nestjs/common';
import AuthenticationService from 'src/services/authentication.service';
import { ValidatedTokenDataProps } from 'src/services/authentication.interfaces';
import {
  JSONUnauthorizedResponse,
  JSONResponseProps,
} from 'src/utils/responses';

export default class AuthenticationMiddleware implements NestMiddleware {
  constructor(private authenticationService: AuthenticationService) {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token: string = request.headers.authorization;

      const data: ValidatedTokenDataProps =
        await this.authenticationService.validateToken(token);

      request['tokenData'] = data;

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
