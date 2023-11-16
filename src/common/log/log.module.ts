import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserClickEntity } from './entity/userClick.entity';
import { UserVisitEntity } from './entity/userVisit.entity';


@Module({
  controllers: [LogController],
  exports: [LogService],
  providers: [LogService],
  imports: [TypeOrmModule.forFeature([
    UserClickEntity,
    UserVisitEntity
  ])]
})

export class LogModule {}