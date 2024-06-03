import { Controller, Res, Post, Body } from '@nestjs/common';
import { Response } from 'express';
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

@Controller('auth')
export default class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

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
