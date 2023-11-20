import { BadRequestException, Injectable, UnauthorizedException, Response, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/mananaweb/user/user.service';
import { UserSigninDto } from './dto/signin.dto';
import { UserEntity } from 'src/mananaweb/user/entity/user.entity';
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
    ) { }

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

                const token = this.createToken(delPwUserData);
                await this.userService.updateSignin(savedUser);
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

    async signin(user: UserEntity) {
        //1. user validate with hashed pw        
        if (this.validateUser) {
            const signinDateUpdate = this.userService.updateSignin(user);

            //1-2. when validated >> token created
            if (signinDateUpdate) return this.createToken(user);
        }        
    }

    //로그아웃
    async signout(user: UserEntity) {
        await this.userService.removeRefreshToken(user.no);
        return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
    }

    //access token 발급
    createToken(user: UserEntity) {
        const no = user.no;
        const tokenDto = new JwtTokenDto(this.createAccessToken(user), this.createRefreshToken(no));
        this.setCurrentRefreshToken(tokenDto.refresh_token, no);
        return tokenDto;
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

    //refresh >> access token재발급
    async verifyRefreshToken(cookies: string) {
        const refreshToken = this.getCookieForString(cookies, 'refreshToken');

        try {
            //유효성 검사
            const validate = await this.jwtService.verifyAsync(
                refreshToken,
                {
                    secret: this.configService.get('JWT_SECRET'),
                },
            );

            //토큰 번역
            const decode = await this.jwtService.decode(refreshToken) as any;
            if (decode && decode.no) {
                const user = await this.userService.findByNo(decode.no);
                return this.createAccessToken(user);
            } else {
                throw new UnauthorizedException('token validate fail');
            }
        } catch (error) {
            console.error(error);
            throw new UnauthorizedException(error.toString())
        }


    }

    getCookieForString(cookies: string, cookieName: string) {
        const cookieSplit = cookies.split(';');
        for (const cookie of cookieSplit) {
            const [name, value] = cookie.trim().split('=');
            if (name === cookieName) {
                return decodeURIComponent(value);
            }
        }
        throw new BadRequestException('cookieName notfound');
    }

    //로그인 시 pw validate
    async vaildatePw(user: UserEntity, signInDto: UserSigninDto) {
        if (user && user.pw === signInDto.pw) {
            const { pw, ...result } = user;
            return result;
        }
        return null;
    }

    hash(origin: string | number): string {
        return Md5.init(origin);
    }

    isMatch(userInput: string, hashed: string): boolean {
        return Md5.init(userInput) == hashed;
    }

    removePasswordFromUserData(savedUser: UserEntity, text?: string) {
        delete savedUser.pw;
        if (text === 'refresh') delete savedUser.refresh_token;        
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