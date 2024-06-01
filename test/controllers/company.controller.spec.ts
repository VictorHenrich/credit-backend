import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import CompanyController from 'src/controllers/company.controller';
import Company from 'src/models/company.entity';
import CompanyService from 'src/services/company.service';
import { getMockEntity } from '../common';

describe('CompanyController', () => {
  let app: INestApplication;

  let companyService: CompanyService;

  let companyController: CompanyController;

  const mockCompany: Company = getMockEntity<Company>({
    companyName: 'Campanha de teste',
    fantasyName: 'Nome fantasia teste',
    id: 1,
    uuid: '1234',
  });

  const url: string = '/company';

  const urlWithUUID: string = `${url}/${mockCompany.uuid}`;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository<Company>,
        },
      ],
      controllers: [CompanyController],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);

    companyController = module.get<CompanyController>(CompanyController);

    app = module.createNestApplication();

    jest.spyOn(companyService, 'createCompany').mockResolvedValue(mockCompany);
    jest.spyOn(companyService, 'findCompany').mockResolvedValue(mockCompany);
    jest
      .spyOn(companyService, 'findManyCompany')
      .mockResolvedValue([mockCompany]);
    jest.spyOn(companyService, 'updateCompany').mockResolvedValue(mockCompany);

    await app.init();
  });

  it('/GET list companies', () => {
    request(app.getHttpServer())
      .get(url)
      .expect(200)
      .expect({ data: companyService.findManyCompany() });
  });

  it('/GET/COMPANY_UUID capture company', () => {
    request(app.getHttpServer())
      .get(urlWithUUID)
      .expect(200)
      .expect({ data: companyService.findCompany({ uuid: mockCompany.uuid }) });
  });

  it('/POST create company', () => {
    request(app.getHttpServer())
      .post(url)
      .expect(200)
      .expect({ data: companyService.createCompany({ ...mockCompany }) });
  });

  it('/PUT/COMPANY_UUID update company', () => {
    request(app.getHttpServer())
      .put(urlWithUUID)
      .expect(200)
      .expect({ data: companyService.updateCompany({ ...mockCompany }) });
  });

  afterAll(async () => {
    await app.close();
  });
});
