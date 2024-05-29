import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CompanyService from './services/company.service';
import CompanyController from './controllers/company.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [],
        synchronize: true,
        autoLoadEntities: true
    })
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class AppModule {}
