import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import Company from '../../src/models/company.entity';
import CompanyService from '../../src/services/company.service';

describe('CompanyService', ()=> {
    let companyService: CompanyService;

    const mockCompany: Company = {
        id: 1,
        uuid: "",
        companyName: "Empresa Teste",
        fantasyName: "Empresa Fantasia Teste",
        employees: []
    }

    const mockCompanyRepository = {
        create: jest.fn().mockReturnValue(mockCompany),
        update: jest.fn().mockReturnValue(undefined),
        findOneByOrFail: jest.fn().mockReturnValue(mockCompany),
        find: jest.fn().mockReturnValue([mockCompany])
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyService,
                {
                    provide: getRepositoryToken(Company),
                    useValue: mockCompanyRepository
                }
            ]
        }).compile();

        companyService = module.get<CompanyService>(CompanyService);


    });

    it('Checking if CampanyService has been defined', ()=>{
        expect(companyService).toBeDefined();
    });

    it('Company creation test', async ()=> {
        const newCompany: Company = await companyService.createCompany(mockCompany);

        expect(newCompany).toEqual(mockCompany);
    });

    it('Company update test', async ()=> {
        const result: void = await companyService.updateCompany(mockCompany);

        expect(result).toBeUndefined()
    });

    it('Company capture test', async ()=> {
        const companie: Company = await companyService.findCompany({ uuid: mockCompany.uuid });

        expect(companie).toEqual(mockCompany);
    });

    it('Company listing test', async ()=> {
        const companie: Company[] = await companyService.findManyCompany();

        expect(companie).toContain(mockCompany);
    });

    
});