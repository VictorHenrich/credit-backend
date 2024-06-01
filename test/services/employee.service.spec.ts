import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Employee from 'src/models/employee.entity';
import EmployeeService from 'src/services/employee.service';
import { getMockEntity } from '../common';
import Company from 'src/models/company.entity';

describe('EmployeeService', () => {
  let employeeService: EmployeeService;

  let employeeRepository: Repository<Employee>;

  const mockCompany: Company = getMockEntity<Company>({
    id: 1,
    companyName: 'Empresa teste',
    fantasyName: 'Nome Fantasia',
    agents: [],
    loans: [],
    employees: [],
  });

  const mockEmployee: Employee = getMockEntity<Employee>({
    id: 1,
    uuid: '1234',
    email: 'victorhenrich993@gmail.com',
    name: 'Victor Henrich',
    salary: 1200,
    score: 100,
    password: '1234',
    company: null,
    documentCPF: '',
    loans: [],
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useClass: Repository<Employee>,
        },
      ],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);

    employeeRepository = module.get<Repository<Employee>>(
      getRepositoryToken(Employee),
    );

    jest
      .spyOn(employeeRepository, 'findOneByOrFail')
      .mockResolvedValue(mockEmployee);
    jest.spyOn(employeeRepository, 'findBy').mockResolvedValue([mockEmployee]);
    jest.spyOn(employeeRepository, 'update').mockReturnValue(undefined);
    jest.spyOn(employeeRepository, 'create').mockReturnValue(mockEmployee);
    jest.spyOn(employeeRepository, 'delete').mockReturnValue(undefined);
  });

  it('Checking if CampanyService has been defined', () => {
    expect(employeeService).toBeDefined();
  });

  it('Employee creation test', async () => {
    const newCompany: Employee =
      await employeeService.createEmployee(mockEmployee);

    expect(newCompany).toEqual(mockEmployee);
  });

  it('Employee update test', async () => {
    const result: Employee = await employeeService.updateEmployee(mockEmployee);

    expect(result).toBe(mockEmployee);
  });

  it('Employee capture test', async () => {
    const companie: Employee = await employeeService.findEmployee({
      uuid: mockEmployee.uuid,
    });

    expect(companie).toEqual(mockEmployee);
  });

  it('Employee listing test', async () => {
    const companie: Employee[] = await employeeService.findManyEmployee({
      company: mockCompany,
    });

    expect(companie).toContain(mockEmployee);
  });
});
