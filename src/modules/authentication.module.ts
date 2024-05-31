import { Module } from '@nestjs/common';
import AuthenticationController from 'src/controllers/authentication.controller';
import AuthenticationService from 'src/services/authentication.service';

@Module({
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export default class AuthenticationModule {}
