


export interface ICompanyUUID{
    uuid: string
}

export interface ICompanyBody{
    companyName: string;
    fantasyName: string;
    minimumScore: number;
}

export interface ICompanyEntity extends Partial<ICompanyBody>, ICompanyUUID{
}