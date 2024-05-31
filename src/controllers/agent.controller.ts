import {
  Controller,
  Res,
  Req,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Response, Request } from 'express';
import ResponseUtils from 'src/utils/responses';
import { AgentNotFoundError } from 'src/utils/exceptions';
import AgentService from 'src/services/agent.service';
import { AgentBodyProps } from 'src/services/agent.interfaces';
import Agent from 'src/models/agent.entity';
import Company from 'src/models/company.entity';
import RequestUtils from 'src/utils/request';

@Controller('agent')
export default class AgentController {
  constructor(private agentService: AgentService) {}

  @Get()
  async findMany(@Res() response: Response): Promise<void> {
    const data: Agent[] = await this.agentService.findManyAgent();

    return ResponseUtils.handleSuccessCase<Agent[]>(response, data);
  }

  @Get(':uuid')
  async findOne(
    @Req() request,
    @Res() response: Response,
    @Param('uuid') uuid: string,
  ) {
    try {
      const company: Company = RequestUtils.getCompanyInTokenData(request);

      const data: Agent = await this.agentService.findAgent({ uuid, company });

      return ResponseUtils.handleSuccessCase<Agent>(response, data);
    } catch (error) {
      return ResponseUtils.handleErrorCase(response, error, AgentNotFoundError);
    }
  }

  @Post()
  async create(
    @Req() request,
    @Res() response: Response,
    @Body() body: Omit<AgentBodyProps, 'company'>,
  ): Promise<void> {
    const company: Company = RequestUtils.getCompanyInTokenData(request);

    const data: Agent = await this.agentService.createAgent({
      ...body,
      company,
    });

    return ResponseUtils.handleSuccessCase<Agent>(response, data);
  }

  @Put(':uuid')
  async update(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: AgentBodyProps,
    uuid: string,
  ): Promise<void> {
    try {
      const company: Company = RequestUtils.getCompanyInTokenData(request);

      const data: Agent = await this.agentService.updateAgent({
        uuid,
        company,
        ...body,
      });

      return ResponseUtils.handleSuccessCase<Agent>(response, data);
    } catch (error) {
      return ResponseUtils.handleErrorCase(response, error, AgentNotFoundError);
    }
  }

  @Delete(':uuid')
  async delete(
    @Req() request: Request,
    @Res() response: Response,
    @Param('uuid') uuid: string,
  ) {
    try {
      const company: Company = RequestUtils.getCompanyInTokenData(request);

      const data: Agent = await this.agentService.deleteAgent({
        uuid,
        company,
      });

      return ResponseUtils.handleSuccessCase<Agent>(response, data);
    } catch (error) {
      return ResponseUtils.handleErrorCase(response, error, AgentNotFoundError);
    }
  }
}
