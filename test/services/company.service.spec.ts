import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Company from '../../src/models/company.entity';
import CompanyService from '../../src/services/company.service';

describe('CompanyService', () => {
  let companyService: CompanyService;

  let companyRepository: Repository<Company>;

  const mockCompany: Company = {
    id: 1,
    uuid: '',
    companyName: 'Empresa Teste',
    fantasyName: 'Empresa Fantasia Teste',
    employees: [],
  };

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
    jest.spyOn(companyRepository, 'update').mockResolvedValue(undefined);
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
    const result: void = await companyService.updateCompany(mockCompany);

    expect(result).toBeUndefined();
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
