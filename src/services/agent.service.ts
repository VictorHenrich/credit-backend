import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Agent from 'src/models/agent.entity';
import { AgentBodyProps, AgentEntityProps } from './agent.interface';
import { ModelUUIDProps } from './common';
import CryptUtils from 'src/utils/crypt';
import { AgentNotFoundError } from 'src/utils/exceptions';

@Injectable()
export default class AgentService {
  constructor(
    @InjectRepository(Agent)
    private agentRepository: Repository<Agent>,
  ) {}

  async createAgent(props: AgentBodyProps): Promise<Agent> {
    const password: string = await CryptUtils.createHash(props.password);

    return await this.agentRepository.create({ ...props, password });
  }

  async updateAgent({
    uuid,
    ...props
  }: Omit<AgentEntityProps, 'email' | 'password'>): Promise<Agent> {
    const agent: Agent = await this.findAgent({ uuid });

    Object.assign(agent, props);

    await this.agentRepository.save(agent);

    return agent;
  }

  async deleteAgent({ uuid }: ModelUUIDProps): Promise<Agent> {
    const agent: Agent = await this.findAgent({ uuid });

    await this.agentRepository.remove(agent);

    return agent;
  }

  async findAgent({ uuid }: ModelUUIDProps): Promise<Agent> {
    try {
      return await this.agentRepository.findOneByOrFail({ uuid });
    } catch (error) {
      throw new AgentNotFoundError(uuid);
    }
  }

  async findManyAgent(): Promise<Agent[]> {
    return await this.agentRepository.find();
  }
}
