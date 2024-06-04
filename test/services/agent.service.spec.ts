import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Agent from 'src/models/employee.entity';
import { getMockEntity } from '../common';
import Company from 'src/models/company.entity';
import AgentService from 'src/services/agent.service';

describe('AgentService', () => {
  let agentService: AgentService;

  let agentRepository: Repository<Agent>;

  const mockCompany: Company = getMockEntity<Company>({
    id: 1,
    companyName: 'Empresa teste',
    fantasyName: 'Nome Fantasia',
    agents: [],
    loans: [],
    employees: [],
  });

  const mockAgent: Agent = getMockEntity<Agent>({
    id: 1,
    uuid: '1234',
    email: 'victorhenrich993@gmail.com',
    name: 'Victor Henrich',
    documentCPF: '000000',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentService,
        {
          provide: getRepositoryToken(Agent),
          useClass: Repository<Agent>,
        },
      ],
    }).compile();

    agentService = module.get<AgentService>(AgentService);

    agentRepository = module.get<Repository<Agent>>(getRepositoryToken(Agent));

    jest.spyOn(agentRepository, 'findOneByOrFail').mockResolvedValue(mockAgent);
    jest.spyOn(agentRepository, 'findBy').mockResolvedValue([mockAgent]);
    jest.spyOn(agentRepository, 'update').mockReturnValue(undefined);
    jest.spyOn(agentRepository, 'create').mockReturnValue(mockAgent);
    jest.spyOn(agentRepository, 'delete').mockReturnValue(undefined);
  });

  it('Checking if AgentService has been defined', () => {
    expect(agentService).toBeDefined();
  });

  it('Agent creation test', async () => {
    const newAgent: Agent = await agentService.createAgent(mockAgent);

    expect(newAgent).toEqual(mockAgent);
  });

  it('Agent update test', async () => {
    const result: Agent = await agentService.updateAgent(mockAgent);

    expect(result).toBe(mockAgent);
  });

  it('Agent capture test', async () => {
    const companie: Agent = await agentService.findAgent({
      uuid: mockAgent.uuid,
    });

    expect(companie).toEqual(mockAgent);
  });

  it('Agent listing test', async () => {
    const companie: Agent[] = await agentService.findManyAgent({
      company: mockCompany,
    });

    expect(companie).toContain(mockAgent);
  });
});
