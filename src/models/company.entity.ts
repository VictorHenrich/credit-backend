import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Employee from './employee.entity';

@Entity({
  name: 'company',
})
export default class Company {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  companyName: string;

  @Column({ nullable: false })
  fantasyName: string;

  @OneToMany(() => Employee, (employee: Employee) => employee.company)
  @JoinColumn()
  employees: Employee[];
}
