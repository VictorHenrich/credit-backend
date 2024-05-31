import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Agent from 'src/models/agent.entity';
import AgentService from 'src/services/agent.service';
import AgentController from 'src/controllers/agent.controller';

@Module({
  controllers: [AgentController],
  providers: [AgentService],
  imports: [TypeOrmModule.forFeature([Agent])],
})
export default class AgentsModule {}
