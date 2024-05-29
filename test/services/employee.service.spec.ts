import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Employee from 'src/models/employee.entity';
import EmployeeService from 'src/services/employee.service';

describe('EmployeeService', () => {
  let employeeService: EmployeeService;

  let employeeRepository: Repository<Employee>;

  const mockCompany: Employee = {
    id: 1,
    uuid: '1234',
    email: 'victorhenrich993@gmail.com',
    name: 'Victor Henrich',
    wage: 1200,
    score: 100,
    username: 'victor.henrich',
    password: '1234',
    company: null,
    loan: null,
  };

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
      .mockResolvedValue(mockCompany);
    jest.spyOn(employeeRepository, 'findBy').mockResolvedValue([mockCompany]);
    jest.spyOn(employeeRepository, 'update').mockReturnValue(undefined);
    jest.spyOn(employeeRepository, 'create').mockReturnValue(mockCompany);
    jest.spyOn(employeeRepository, 'delete').mockReturnValue(undefined);
  });

  it('Checking if CampanyService has been defined', () => {
    expect(employeeService).toBeDefined();
  });

  it('Employee creation test', async () => {
    const newCompany: Employee =
      await employeeService.createEmployee(mockCompany);

    expect(newCompany).toEqual(mockCompany);
  });

  it('Employee update test', async () => {
    const result: void = await employeeService.updateEmployee(mockCompany);

    expect(result).toBeUndefined();
  });

  it('Employee capture test', async () => {
    const companie: Employee = await employeeService.findEmployee({
      uuid: mockCompany.uuid,
    });

    expect(companie).toEqual(mockCompany);
  });

  it('Employee listing test', async () => {
    const companie: Employee[] = await employeeService.findManyEmployee();

    expect(companie).toContain(mockCompany);
  });
});
