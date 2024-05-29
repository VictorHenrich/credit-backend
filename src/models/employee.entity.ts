import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Loan from './loan.entity';


@Entity({
    name: "employee"
})
export default class Employee{
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    wage: number

    @Column({default: 0})
    score: number

    @ManyToOne(() => Loan, (loan: Loan) => loan.employees)
    loan: Loan
}