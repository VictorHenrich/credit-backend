import { Controller, Res, Post, Put, Param, Body } from '@nestjs/common';
import { Response } from 'express';
import Employee from 'src/models/employee.entity';
import { EmployeeAuthProps } from 'src/services/authentication.interfaces';
import AuthenticationService from 'src/services/authentication.service';
import { InvalidPasswordError, UserNotFoundError } from 'src/utils/exceptions';
import ResponseUtils from 'src/utils/responses';

@Controller('auth')
export default class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('employee')
  async performEmployeeLogin(
    @Res() response: Response,
    @Body() body: Omit<EmployeeAuthProps, 'uuid'>,
  ): Promise<void> {
    try {
      const data: Employee = await this.authenticationService.authenticateEmployee(body);

      return ResponseUtils.handleSuccessCase<Employee>(response, data);
    } catch (error) {
      return ResponseUtils.handleErrorCase(
        response,
        error,
        InvalidPasswordError,
        UserNotFoundError,
      );
    }
  }

  @Put('employee/:uuid')
  async changeEmployeeCredentials(
    @Res() response: Response,
    @Body() body: Omit<EmployeeAuthProps, 'uuid'>,
    @Param('uuid') uuid: string,
  ): Promise<void> {
    try {
      await this.authenticationService.changeEmployeeCredentials({
        uuid,
        ...body,
      });

      return ResponseUtils.handleSuccessCase<null>(response);
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
