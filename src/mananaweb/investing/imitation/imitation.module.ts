import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { ImitationService } from "./imitation.service";
import { ImitationController } from "./imitation.controller";

@Module({
    imports: [
      TypeOrmModule.forFeature([]),
    ],
    providers: [ImitationService],
    exports: [ImitationService],
    controllers: [ImitationController]
  })
  export class ImitationModule {}