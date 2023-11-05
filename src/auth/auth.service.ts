import { BadRequestException, Injectable, UnauthorizedException, Response } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserSigninDto } from './dto/signin.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { Md5 } from 'md5-typescript';
import { JwtTokenDto } from './dto/jwt-token.dto';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private datasource: DataSource
    ) {}
    async signup(signInDto: UserSigninDto) {
        //typeorm transaction start
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.userService.findById(signInDto.id);
            const exist = user != null;
            if (exist) {
                throw new BadRequestException('중복된 아이디 존재');
            }
            else {
                const hashedPassword = this.hash(signInDto.pw);

                const valiUser = new UserEntity();
                valiUser.id = signInDto.id;
                valiUser.pw = hashedPassword;

                const savedUser = await this.userService.saveUser(valiUser);
                const delPwUserData = this.removePasswordFromUserData(savedUser);

                const token = this.createToken(delPwUserData)
                await queryRunner.commitTransaction();

                return token;
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error(error);
        } finally {
            await queryRunner.release();
        }

    }

    //access token 발급
    createToken(user: UserEntity): JwtTokenDto {
        console.log(user);
        const no = user.no;
        const tokenDto = new JwtTokenDto(this.createAccessToken(user), this.createRefreshToken(no));
        console.log(tokenDto);
        this.setCurrentRefreshToken(tokenDto.refresh_token, no);        
        return tokenDto;
    }

    //로그인 시 pw validate
    async vaildatePw(user: UserEntity, signInDto: UserSigninDto) {
        if (user && user.pw === signInDto.pw) {
            const { pw, ...result } = user;
            return result;
        }
        return null;
    }

    //validate for stragety
    async validateUser(id: string, password: string): Promise<any> {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new UnauthorizedException('가입된 유저가 아닙니다.');
        }
        if (user && (await this.isMatch(password, user.pw))) {
            delete user.pw;
            return user;
        } else {
            throw new BadRequestException('패스워드를 확인해주세요');
        }
    }

    async signout(user: UserEntity) {
        await this.userService.removeRefreshToken(user.no);
        return [
            'Authentication=; HttpOnly; Path=/; Max-Age=0',
            'Refresh=; HttpOnly; Path=/; Max-Age=0'
        ];
    }

    hash(origin: string | number): string {
        return Md5.init(origin);
    }

    isMatch(userInput: string, hashed: string): boolean {
        return Md5.init(userInput) == hashed;
    }

    removePasswordFromUserData(savedUser: UserEntity) {
        delete savedUser.pw;
        return savedUser;
    }

    createAccessToken(user: UserEntity) {
        const cu = { no: user.no, id: user.id };
        return this.jwtService.sign(cu, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('expiresIn')
        });
    }

    createRefreshToken(no: number) {
        return this.jwtService.sign({ no }, {
            secret: this.configService.get('JWT_SECERT'),
            expiresIn: this.configService.get('expiresInRefresh')
        });
    }

    setCurrentRefreshToken(refreshToken: string, no: number) {
        const currentHashedRefreshToken = this.hash(refreshToken);
        this.userService.updateRefreshToken(no, currentHashedRefreshToken);
    }
}