import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Md5 } from 'md5-typescript';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async findById(id: string) {
        return await this.userRepository.findOneBy({ id: id })
    }

    async saveUser(savedUser: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(savedUser);
    }

    async updateRefreshToken(no: number, currentHashedRefreshToken: string) {
        return await this.userRepository.update(no, { refresh_token: currentHashedRefreshToken })
    }

    async refreshTokenMatches(refreshToken: string, no: number) {
        const user = await this.userRepository.findOneBy({ no: no });

        const isMatches = this.isMatch(refreshToken, user.refresh_token);
        if (isMatches) return user;
    }

    async removeRefreshToken(no: number) {
        return this.userRepository.update(no, { refresh_token: null });
    }

    isMatch(userInput: string, hashed: string): boolean {
        return Md5.init(userInput) == hashed;
    }

}

