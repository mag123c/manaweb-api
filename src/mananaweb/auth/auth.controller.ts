import { Body, Controller, Get, Post, Request, Res, Response, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UserSigninDto } from './dto/signin.dto';
import { JwtTokenDto } from './dto/jwt-token.dto';
import { UserEntity } from 'src/mananaweb/user/entity/user.entity';
import { RefreshAuthGuard } from './guard/refresh-auth.guard';
import { UserEntityBuilder } from 'src/mananaweb/user/builder/user.builder';

@ApiTags('auth')
@ApiBearerAuth('accessToken')
@Controller({ path: 'auth' })
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    @ApiOperation({ description: '회원가입' })
    @ApiResponse({ status: 201, description: '가입 성공시 JWT_TOKEN을 발급합니다.', type: JwtTokenDto })
    async signup(@Body() signInDto: UserSigninDto) {
        const data = await this.authService.signup(signInDto);
        return data;
    }

    @Post('/signin')
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ description: '로그인' })
    @ApiParam({ type: UserSigninDto, name: '로그인 DTO'})
    @ApiResponse({ status: 200, description: 'JWT_TOKEN을 발급합니다.', type: JwtTokenDto })
    signin(@Request() req) {
        return this.authService.signin(req.user);
    }
    
    @Post('/signout')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: '로그아웃' })
    async logout(@Request() req) {
        return await this.authService.signout(req.user);
    }

    @Post('/refresh')
    @UseGuards(RefreshAuthGuard)
    @ApiOperation({ description: '토큰 재발급' })
    async refreshToken(@Request() req) {        
        const accessToken = await this.authService.createAccessToken(req.user);
        const user = new UserEntityBuilder()
            .withNo(req.user.no)
            .withId(req.user.id)        
        return { accessToken, user };
    }

    @Get('/dev')
    @ApiOperation({ description: 'dev accesstoken' })
    getAccessTokenByDev() {
        console.log(typeof process.env.NODE_ENV, process.env.NODE_ENV.length);
        if (process.env.NODE_ENV == 'dev') {
            const user = new UserEntity();
            console.log('dev!!')
            user.no = 1;
            user.id = 'diehreo';            
            return this.authService.createToken(user);
        }        
    }
}
