import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Company from 'src/models/company.entity';
import { ICompanyBody, ICompanyEntity, ICompanyUUID } from './company.interface';

@Injectable()
export default class CompanyService{
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>
    ){

    }

    async createCompany(props: ICompanyBody): Promise<Company>{
        const company: Company = await this.companyRepository.create({...props})
        
        return company;
    }

    async updateCompany({uuid, ...props}: ICompanyEntity): Promise<void>{
        await this.companyRepository.update({ uuid }, props);
    }

    async findCompany({ uuid }: ICompanyUUID): Promise<Company>{
        return await this.companyRepository.findOneByOrFail({ uuid });
    }

    async findManyCompany(): Promise<Company[]>{
        return await this.companyRepository.find();
    }
}