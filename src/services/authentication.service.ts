import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import Employee from 'src/models/employee.entity';
import CryptUtils from 'src/utils/crypt';
import {
  UserAuthProps,
  TokenDataProps,
  ValidatedTokenDataProps,
} from './authentication.interfaces';
import { InvalidTokenError, UserNotFoundError } from 'src/utils/exceptions';
import Agent from 'src/models/agent.entity';
import Company from 'src/models/company.entity';
import CompanyService from './company.service';

@Injectable()
export default class AuthenticationService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    private readonly agentRepository: Repository<Agent>,

    private readonly companyService: CompanyService,

    private readonly jwtService: JwtService,
  ) {}

  private async findEmployeeByEmail(email: string): Promise<Employee> {
    try {
      return await this.employeeRepository.findOneByOrFail({ email });
    } catch (error) {
      throw new UserNotFoundError(email);
    }
  }

  private async findAgentByEmail(email: string): Promise<Agent> {
    try {
      return await this.agentRepository.findOneByOrFail({ email });
    } catch (error) {
      throw new UserNotFoundError(email);
    }
  }

  private async handleAuthenticationUser(
    company: Company,
    userUUID: string,
    email: string,
    password: string,
  ): Promise<string> {
    const passwordCrypted: string = await CryptUtils.createHash(password);

    await CryptUtils.compareHash(password, passwordCrypted);

    const tokenData: TokenDataProps = {
      companyUUID: company.uuid,
      userUUID,
      email,
    };

    const token: string = await this.jwtService.signAsync(tokenData);

    return token;
  }

  async authenticateEmployee({
    email,
    password,
  }: Omit<UserAuthProps, 'uuid'>): Promise<string> {
    const employee: Employee = await this.findEmployeeByEmail(email);

    return await this.handleAuthenticationUser(
      employee.company,
      employee.uuid,
      email,
      password,
    );
  }

  async authenticateAgent({
    email,
    password,
  }: Omit<UserAuthProps, 'uuid'>): Promise<string> {
    const agent: Agent = await this.findAgentByEmail(email);

    return await this.handleAuthenticationUser(
      agent.company,
      agent.uuid,
      email,
      password,
    );
  }

  async validateToken(token: string): Promise<ValidatedTokenDataProps> {
    const tokenHandled: string = token.replace(/Bearer\s*/i, '').trim();

    try {
      const { companyUUID: uuid, ...tokenData }: TokenDataProps =
        await this.jwtService.verifyAsync(tokenHandled);

      const company: Company = await this.companyService.findCompany({ uuid });

      return {
        ...tokenData,
        company,
      };
    } catch (error) {
      throw new InvalidTokenError(token);
    }
  }
}
