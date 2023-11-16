import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { ErrorHistoryService } from "./errorhistory.service";
import { ErrorHistoryEntity } from "./entity/errorhistory.entity";
import { ErrorHistoryController } from "./errorhistory.controller";

@Module({
    imports: [
      TypeOrmModule.forFeature([ErrorHistoryEntity]),
    ],
    providers: [ErrorHistoryService],
    exports: [ErrorHistoryService],
    controllers: [ErrorHistoryController]
  })
  export class ErrorHistoryModule {}