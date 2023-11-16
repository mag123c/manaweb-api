import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SuggestionEntity } from 'src/mananaweb/suggestion/entity/suggestion.entity';
import { UserEntity } from './entity/user.entity';
import { AuthService } from 'src/mananaweb/auth/auth.service';
import { UserInvestmentDataEntity } from './entity/user-investment.entity';


@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([
    UserEntity,
    UserInvestmentDataEntity,
  ]),
]
})

export class UserModule {}