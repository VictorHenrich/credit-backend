import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Agent from 'src/models/agent.entity';
import AgentService from 'src/services/agent.service';
import AgentController from 'src/controllers/agent.controller';
import AgentAuthMiddleware from 'src/middlewares/agentAuth.middleware';

@Module({
  controllers: [AgentController],
  providers: [AgentService],
  imports: [TypeOrmModule.forFeature([Agent])],
})
export default class AgentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AgentAuthMiddleware);
  }
}
