import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Agent from 'src/models/agent.entity';
import { AgentBodyProps, AgentEntityProps } from './agent.interfaces';
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

    const agent: Agent = this.agentRepository.create({ ...props, password });

    await this.agentRepository.save(agent);

    return agent;
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
    const agent: Agent = await this.agentRepository.findOne({
      where: { uuid, company },
      relations: ['company'],
    });

    if (!agent) throw new AgentNotFoundError(uuid);

    return agent;
  }

  async findManyAgent(): Promise<Agent[]> {
    return await this.agentRepository.find();
  }
}
