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
  TokenDataResultProps,
  RefreshTokenDataResultProps,
} from './authentication.interfaces';
import { InvalidTokenError, UserNotFoundError } from 'src/utils/exceptions';
import Agent from 'src/models/agent.entity';
import Company from 'src/models/company.entity';
import CompanyService from './company.service';
import EmployeeService from './employee.service';
import AgentService from './agent.service';

@Injectable()
export default class AuthenticationService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,

    private readonly companyService: CompanyService,

    private readonly employeeService: EmployeeService,

    private readonly agentService: AgentService,

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

  private async createToken(props: TokenDataProps): Promise<string> {
    return await this.jwtService.signAsync(props, { expiresIn: '10m' });
  }

  private async createRefreshToken(props: TokenDataProps): Promise<string> {
    return await this.jwtService.signAsync(props, { expiresIn: '1d' });
  }

  private async handleAuthenticationUser(
    { uuid: companyUUID }: Company,
    userUUID: string,
    email: string,
    password: string,
  ): Promise<TokenDataResultProps> {
    const passwordCrypted: string = await CryptUtils.createHash(password);

    await CryptUtils.compareHash(password, passwordCrypted);

    const tokenData: TokenDataProps = {
      companyUUID,
      userUUID,
      email,
      refreshToken: false,
    };

    const refreshTokenData: TokenDataProps = {
      ...tokenData,
      refreshToken: true,
    };

    const token: string = await this.createToken(tokenData);

    const refreshToken: string =
      await this.createRefreshToken(refreshTokenData);

    return { token, refreshToken };
  }

  private async validateToken(token: string): Promise<TokenDataProps> {
    const tokenHandled: string = token.replace(/Bearer\s*/i, '').trim();

    try {
      const tokenData: TokenDataProps =
        await this.jwtService.verifyAsync(tokenHandled);

      return tokenData;
    } catch (error) {
      throw new InvalidTokenError(token);
    }
  }

  async authenticateEmployee({
    email,
    password,
  }: Omit<UserAuthProps, 'uuid'>): Promise<TokenDataResultProps> {
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
  }: Omit<UserAuthProps, 'uuid'>): Promise<TokenDataResultProps> {
    const agent: Agent = await this.findAgentByEmail(email);

    return await this.handleAuthenticationUser(
      agent.company,
      agent.uuid,
      email,
      password,
    );
  }

  async refreshToken(token: string): Promise<RefreshTokenDataResultProps> {
    const refreshTokenData: TokenDataProps = await this.validateToken(token);

    if (!refreshTokenData.refreshToken) throw new InvalidTokenError(token);

    const newToken: string = await this.createToken({
      ...refreshTokenData,
      refreshToken: false,
    });

    return { token: newToken };
  }

  async captureAgentData(
    token: string,
  ): Promise<ValidatedTokenDataProps<Agent>> {
    const {
      userUUID: uuid,
      companyUUID,
      email,
    }: TokenDataProps = await this.validateToken(token);

    const company: Company = await this.companyService.findCompany({
      uuid: companyUUID,
    });

    const user: Agent = await this.agentService.findAgent({ company, uuid });

    return { email, user, company };
  }

  async captureEmployeeData(
    token: string,
  ): Promise<ValidatedTokenDataProps<Employee>> {
    const {
      userUUID: uuid,
      companyUUID,
      email,
    }: TokenDataProps = await this.validateToken(token);

    const company: Company = await this.companyService.findCompany({
      uuid: companyUUID,
    });

    const user: Employee = await this.employeeService.findEmployee({
      company,
      uuid,
    });

    return { email, user, company };
  }
}
