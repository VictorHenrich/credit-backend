import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import Company from './company.entity';
import { UserBaseModel } from './base';

@Entity({
  name: 'agent',
})
export default class Agent extends UserBaseModel {
  @ManyToOne(() => Company, (companye: Company) => companye.agents)
  @JoinColumn()
  company: Company;
}
