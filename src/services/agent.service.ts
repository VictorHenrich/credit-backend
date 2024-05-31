import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Agent from 'src/models/agent.entity';
import { AgentBodyProps, AgentEntityProps } from './agent.interface';
import CryptUtils from 'src/utils/crypt';
import { AgentNotFoundError } from 'src/utils/exceptions';

type AgentFindingType = Pick<AgentEntityProps, 'uuid' | 'company'>;

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
    company,
    ...props
  }: Omit<AgentEntityProps, 'email' | 'password'>): Promise<Agent> {
    const agent: Agent = await this.findAgent({ uuid, company });

    Object.assign(agent, { ...props, company: undefined });

    await this.agentRepository.save(agent);

    return agent;
  }

  async deleteAgent({ uuid, company }: AgentFindingType): Promise<Agent> {
    const agent: Agent = await this.findAgent({ uuid, company });

    await this.agentRepository.remove(agent);

    return agent;
  }

  async findAgent({ uuid, company }: AgentFindingType): Promise<Agent> {
    try {
      return await this.agentRepository.findOneByOrFail({ uuid, company });
    } catch (error) {
      throw new AgentNotFoundError(uuid);
    }
  }

  async findManyAgent(): Promise<Agent[]> {
    return await this.agentRepository.find();
  }
}
