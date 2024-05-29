import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Employee from './employee.entity';

@Entity({
  name: 'loan',
})
export default class Loan {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, default: 0 })
  minimumScore: number;

  @OneToMany(() => Employee, (employee: Employee) => employee.loan)
  @JoinColumn()
  employees: Employee[];
}
