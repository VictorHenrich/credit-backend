import { Request, Response, NextFunction } from 'express';
import { NestMiddleware } from '@nestjs/common';
import AuthenticationService from 'src/services/authentication.service';
import {
  JSONUnauthorizedResponse,
  JSONResponseProps,
} from 'src/utils/responses';
import RequestUtils from 'src/utils/request';
import { ValidatedTokenDataProps } from 'src/services/authentication.interfaces';
import Agent from 'src/models/agent.entity';

export default class AgentAuthMiddleware implements NestMiddleware {
  constructor(private authenticationService: AuthenticationService) {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token: string = request.headers.authorization;

      const data: ValidatedTokenDataProps<Agent> =
        await this.authenticationService.captureAgentData(token);

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
