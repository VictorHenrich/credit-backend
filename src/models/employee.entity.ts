import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Loan from './loan.entity';
import Company from './company.entity';

@Entity({
  name: 'employee',
})
export default class Employee {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, default: 0 })
  wage: number;

  @Column({ default: 0 })
  score: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Loan, (loan: Loan) => loan.employees)
  loan: Loan;

  @ManyToOne(() => Company, (companye: Company) => companye.employees)
  company: Company;
}
