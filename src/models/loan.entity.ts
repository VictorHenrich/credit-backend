import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Employee from './employee.entity';


@Entity({
    name: "loan"
})
export default class Loan{
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable: false})
    description: string

    @Column({nullable: false})
    minimumScore: number

    @OneToMany(() => Employee, (employee: Employee) => employee.loan)
    employees: Employee[]
}