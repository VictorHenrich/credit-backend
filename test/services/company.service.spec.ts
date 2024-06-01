import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Company from '../../src/models/company.entity';
import CompanyService from '../../src/services/company.service';
import { getMockEntity } from '../common';

describe('CompanyService', () => {
  let companyService: CompanyService;

  let companyRepository: Repository<Company>;

  const mockCompany: Company = getMockEntity<Company>({
    id: 1,
    uuid: '',
    companyName: 'Empresa Teste',
    fantasyName: 'Empresa Fantasia Teste',
    agents: [],
    employees: [],
    loans: [],
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository<Company>,
        },
      ],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);

    companyRepository = module.get<Repository<Company>>(
      getRepositoryToken(Company),
    );

    jest
      .spyOn(companyRepository, 'findOneByOrFail')
      .mockResolvedValue(mockCompany);
    jest.spyOn(companyRepository, 'find').mockResolvedValue([mockCompany]);
    jest.spyOn(companyRepository, 'save').mockResolvedValue(undefined);
    jest.spyOn(companyRepository, 'create').mockReturnValue(mockCompany);
  });

  it('Checking if CampanyService has been defined', () => {
    expect(companyService).toBeDefined();
  });

  it('Company creation test', async () => {
    const newCompany: Company = await companyService.createCompany(mockCompany);

    expect(newCompany).toEqual(mockCompany);
  });

  it('Company update test', async () => {
    const companyUpdated: Company =
      await companyService.updateCompany(mockCompany);

    expect(companyUpdated).not.toBeNull();
    expect(companyUpdated).toBe(companyUpdated);
  });

  it('Company capture test', async () => {
    const companie: Company = await companyService.findCompany({
      uuid: mockCompany.uuid,
    });

    expect(companie).toEqual(mockCompany);
  });

  it('Company listing test', async () => {
    const companie: Company[] = await companyService.findManyCompany();

    expect(companie).toContain(mockCompany);
  });
});
