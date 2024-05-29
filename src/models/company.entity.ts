import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
    name: "company"
})
export default class Company{
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable: false})
    companyName: string

    @Column({nullable: false})
    fantasyName: string
}