import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import Company from 'src/models/company.entity';
import Employee from 'src/models/employee.entity';
import { getMockEntity } from '../common';
import EmployeeService from 'src/services/employee.service';
import EmployeeController from 'src/controllers/employee.controller';

describe('EmployeeController', () => {
  let app: INestApplication;

  let employeeService: EmployeeService;

  let employeeController: EmployeeController;

  const mockCompany: Company = getMockEntity<Company>({
    companyName: 'Campanha de teste',
    fantasyName: 'Nome fantasia teste',
    id: 1,
    uuid: '1234',
  });

  const mockEmployee: Employee = getMockEntity<Employee>({
    documentCPF: '00000000',
    email: 'victorhenrich993@gmail.com',
    id: 1,
    name: 'Victor Henrich',
    password: '1234',
    salary: 1000,
  });

  const url: string = '/company';

  const urlWithUUID: string = `${url}/${mockEmployee.uuid}`;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useClass: Repository<Employee>,
        },
      ],
      controllers: [EmployeeController],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);

    employeeController = module.get<EmployeeController>(EmployeeController);

    app = module.createNestApplication();

    jest
      .spyOn(employeeService, 'createEmployee')
      .mockResolvedValue(mockEmployee);
    jest.spyOn(employeeService, 'findEmployee').mockResolvedValue(mockEmployee);
    jest
      .spyOn(employeeService, 'findManyEmployee')
      .mockResolvedValue([mockEmployee]);
    jest
      .spyOn(employeeService, 'updateEmployee')
      .mockResolvedValue(mockEmployee);

    await app.init();
  });

  it('/GET list companies', () => {
    request(app.getHttpServer())
      .get(url)
      .expect(200)
      .expect({
        data: employeeService.findManyEmployee({ company: mockCompany }),
      });
  });

  it('/GET/COMPANY_UUID capture company', () => {
    request(app.getHttpServer())
      .get(urlWithUUID)
      .expect(200)
      .expect({
        data: employeeService.findEmployee({
          uuid: mockEmployee.uuid,
          company: mockCompany,
        }),
      });
  });

  it('/POST create company', () => {
    request(app.getHttpServer())
      .post(url)
      .expect(200)
      .expect({
        data: employeeService.createEmployee({
          company: mockCompany,
          ...mockEmployee,
        }),
      });
  });

  it('/PUT/COMPANY_UUID update company', () => {
    request(app.getHttpServer())
      .put(urlWithUUID)
      .expect(200)
      .expect({
        data: employeeService.updateEmployee({
          ...mockEmployee,
          company: mockCompany,
        }),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
