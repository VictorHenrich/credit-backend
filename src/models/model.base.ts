import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export default abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  uuid: string;
}
