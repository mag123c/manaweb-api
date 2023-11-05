import { Body, Controller, Get, Post, Request, Res, Response, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UserSigninDto } from './dto/signin.dto';
import { JwtTokenDto } from './dto/jwt-token.dto';
import { Jwt } from 'src/decorator/CurrentUserDecorator';
import CurrentUser from './dto/currentUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/user/entity/user.entity';

@ApiTags('auth')
@Controller('/api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    @ApiOperation({ description: '회원가입' })
    @ApiResponse({ status: 201, description: '가입 성공시 JWT_TOKEN을 발급합니다.', type: JwtTokenDto })
    async signup(@Body() signInDto: UserSigninDto) {
        const data = await this.authService.signup(signInDto);
        console.log(data);
        return data;
    }

    @Post('/signin')
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ description: '로그인' })
    @ApiResponse({ status: 200, description: 'JWT_TOKEN을 발급합니다.', type: JwtTokenDto })
    signin(@Request() req) {  
        return this.authService.createToken(req.user);
    }

    @Get('/refresh')
    @UseGuards(AuthGuard('jwt-refresh-token'))
    @ApiOperation({ description: '토큰 재발급' })
    async getProfile(@Jwt() user: CurrentUser) {
        return user;
    }

    @Post('/signout')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: '로그아웃' })
    async logout(@Request() req) {
        return await this.authService.signout(req.user);

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
