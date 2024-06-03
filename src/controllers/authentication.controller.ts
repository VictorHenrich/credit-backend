import { Controller, Res, Post, Body, Get, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import AuthenticationService from 'src/services/authentication.service';
import { InvalidPasswordError, UserNotFoundError } from 'src/utils/exceptions';
import ResponseUtils from 'src/utils/responses';
import {
  RefreshTokenBodyParams,
  UserAuthBodyParams,
} from './authentication.params';
import {
  TokenDataResultProps,
  RefreshTokenDataResultProps,
} from 'src/services/authentication.interfaces';
import RequestUtils from 'src/utils/request';
import Employee from 'src/models/employee.entity';
import Agent from 'src/models/agent.entity';

@Controller('auth')
export default class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Get('employee')
  async getEmployee(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const employee: Employee = RequestUtils.getEmployeeInTokenData(request);

    return ResponseUtils.handleSuccessCase<Employee>(response, employee);
  }

  @Get('agent')
  async getAgent(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const agent: Agent = RequestUtils.getAgentInTokenData(request);

    return ResponseUtils.handleSuccessCase<Agent>(response, agent);
  }

  @Post('refresh')
  async refreshToken(
    @Res() response: Response,
    @Body() { token }: RefreshTokenBodyParams,
  ): Promise<void> {
    try {
      const data: RefreshTokenDataResultProps =
        await this.authenticationService.refreshToken(token);

      return ResponseUtils.handleSuccessCase<RefreshTokenBodyParams>(
        response,
        data,
      );
    } catch (error) {
      return ResponseUtils.handleErrorCase(response, error, UserNotFoundError);
    }
  }

  @Post('employee')
  async performEmployeeLogin(
    @Res() response: Response,
    @Body() body: UserAuthBodyParams,
  ): Promise<void> {
    try {
      const data: TokenDataResultProps =
        await this.authenticationService.authenticateEmployee(body);

      return ResponseUtils.handleSuccessCase<TokenDataResultProps>(
        response,
        data,
      );
    } catch (error) {
      return ResponseUtils.handleErrorCase(
        response,
        error,
        InvalidPasswordError,
        UserNotFoundError,
      );
    }
  }

  @Post('agent')
  async performAgentLogin(
    @Res() response: Response,
    @Body() body: UserAuthBodyParams,
  ): Promise<void> {
    try {
      const data: TokenDataResultProps =
        await this.authenticationService.authenticateAgent(body);

      return ResponseUtils.handleSuccessCase<TokenDataResultProps>(
        response,
        data,
      );
    } catch (error) {
      return ResponseUtils.handleErrorCase(
        response,
        error,
        InvalidPasswordError,
        UserNotFoundError,
      );
    }
  }
}
