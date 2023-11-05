import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SuggestionEntity } from 'src/suggestion/entity/suggestion.entity';
import { UserEntity } from './entity/user.entity';
import { AuthService } from 'src/auth/auth.service';


@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([
    UserEntity
  ]),
]
})

export class UserModule {}