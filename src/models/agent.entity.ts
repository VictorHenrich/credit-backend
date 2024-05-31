import { Entity, ManyToOne } from 'typeorm';
import Company from './company.entity';
import { UserBaseModel } from './base';

@Entity({
  name: 'employee',
})
export default class Agent extends UserBaseModel {
  @ManyToOne(() => Company, (companye: Company) => companye.agents)
  company: Company;
}
