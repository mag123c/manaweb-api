import { Module } from '@nestjs/common';
import { PnlService } from './pnl.service';
import { PnlController } from './pnl.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PnlUserEntity } from './entity/pnl_user.entity';
import { PnlUserProfitEntity } from './entity/pnl_user_profit.entity';

@Module({
  providers: [PnlService],
  controllers: [PnlController],
  imports: [
    TypeOrmModule.forFeature([
      PnlUserEntity,
      PnlUserProfitEntity,
    ])
  ]
})
export class PnlModule {}
