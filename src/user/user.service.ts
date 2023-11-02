import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ){}

    async findById(id: string) {
        return await this.userRepository.findOneBy({ id: id })
    }

    async saveUser(savedUser: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(savedUser);
    }
    
}

