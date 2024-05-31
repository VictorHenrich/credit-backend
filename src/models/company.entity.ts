import { Entity, Column, OneToMany } from 'typeorm';
import Employee from './employee.entity';
import BaseModel from './base';
import Agent from './agent.entity';

@Entity({
  name: 'company',
})
export default class Company extends BaseModel {
  @Column({ nullable: false })
  companyName: string;

  @Column({ nullable: false })
  fantasyName: string;

  @OneToMany(() => Employee, (employee: Employee) => employee.company)
  employees: Employee[];

  @OneToMany(() => Agent, (agent: Agent) => agent.company)
  agents: Agent[];
}
