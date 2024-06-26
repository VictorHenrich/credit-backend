import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Company from 'src/models/company.entity';
import { CompanyBodyProps, CompanyEntityProps } from './company.interfaces';
import { UUIDModelProps } from './common';
import { CompanyNotFoundError } from 'src/utils/exceptions';

@Injectable()
export default class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createCompany(props: CompanyBodyProps): Promise<Company> {
    delete props['uuid'];

    const company: Company = this.companyRepository.create({ ...props });

    await this.companyRepository.insert(company);

    return company;
  }

  async updateCompany({
    uuid,
    ...props
  }: CompanyEntityProps): Promise<Company> {
    const company: Company = await this.findCompany({ uuid });

    Object.assign(company, props);

    await this.companyRepository.save(company);

    return company;
  }

  async findCompany({ uuid }: UUIDModelProps): Promise<Company> {
    try {
      return await this.companyRepository.findOneByOrFail({ uuid });
    } catch (error) {
      throw new CompanyNotFoundError(uuid);
    }
  }

  async findManyCompany(): Promise<Company[]> {
    return await this.companyRepository.find();
  }
}
