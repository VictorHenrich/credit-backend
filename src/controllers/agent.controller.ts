import {
  Controller,
  Res,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import ResponseUtils from 'src/utils/responses';
import { AgentNotFoundError } from 'src/utils/exceptions';
import AgentService from 'src/services/agent.service';
import { AgentBodyProps } from 'src/services/agent.interface';
import Agent from 'src/models/agent.entity';

@Controller('agent')
export default class AgentController {
  constructor(private agentService: AgentService) {}

  @Get()
  async findMany(@Res() response: Response): Promise<void> {
    const data: Agent[] = await this.agentService.findManyAgent();

    return ResponseUtils.handleSuccessCase<Agent[]>(response, data);
  }

  @Get(':uuid')
  async findOne(@Res() response: Response, @Param('uuid') uuid: string) {
    try {
      const data: Agent = await this.agentService.findAgent({ uuid });

      return ResponseUtils.handleSuccessCase<Agent>(response, data);
    } catch (error) {
      return ResponseUtils.handleErrorCase(response, error, AgentNotFoundError);
    }
  }

  @Post()
  async create(
    @Res() response: Response,
    @Body() body: AgentBodyProps,
  ): Promise<void> {
    const data: Agent = await this.agentService.createAgent({
      ...body,
    });

    return ResponseUtils.handleSuccessCase<Agent>(response, data);
  }

  @Put(':uuid')
  async update(
    @Res() response: Response,
    @Body() body: AgentBodyProps,
    uuid: string,
  ): Promise<void> {
    try {
      const data: Agent = await this.agentService.updateAgent({
        uuid,
        ...body,
      });

      return ResponseUtils.handleSuccessCase<Agent>(response, data);
    } catch (error) {
      return ResponseUtils.handleErrorCase(response, error, AgentNotFoundError);
    }
  }

  @Delete(':uuid')
  async delete(@Res() response: Response, @Param('uuid') uuid: string) {
    try {
      const data: Agent = await this.agentService.deleteAgent({
        uuid,
      });

      return ResponseUtils.handleSuccessCase<Agent>(response, data);
    } catch (error) {
      return ResponseUtils.handleErrorCase(response, error, AgentNotFoundError);
    }
  }
}
