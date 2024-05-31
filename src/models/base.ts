import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export default abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  uuid: string;
}

export abstract class UserBaseModel extends BaseModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  documentCPF: string;

  @Column({ nullable: false })
  password: string;
}
