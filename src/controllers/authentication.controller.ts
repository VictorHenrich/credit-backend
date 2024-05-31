import { Controller, Res, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { UserAuthProps } from 'src/services/authentication.interfaces';
import AuthenticationService from 'src/services/authentication.service';
import { InvalidPasswordError, UserNotFoundError } from 'src/utils/exceptions';
import ResponseUtils from 'src/utils/responses';

@Controller('auth')
export default class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('employee')
  async performEmployeeLogin(
    @Res() response: Response,
    @Body() body: Omit<UserAuthProps, 'uuid'>,
  ): Promise<void> {
    try {
      const data: string =
        await this.authenticationService.authenticateEmployee(body);

      return ResponseUtils.handleSuccessCase<string>(response, data);
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
    @Body() body: Omit<UserAuthProps, 'uuid'>,
  ): Promise<void> {
    try {
      const data: string =
        await this.authenticationService.authenticateAgent(body);

      return ResponseUtils.handleSuccessCase<string>(response, data);
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
