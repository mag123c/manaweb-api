import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UserSigninDto } from './dto/signin.dto';
import { JwtTokenDto } from './dto/jwt-token.dto';
import { Response } from 'express';
import RequestWithUser from './request.user';
import { Jwt } from 'src/decorator/CurrentUserDecorator';
import CurrentUser from './dto/currentUser.dto';

@ApiTags('auth')
@Controller('/api/v1/auth')
export class AuthController {
    constructor( private authService: AuthService ){}

    @Post('/signup')
    @ApiOperation({ description: '회원가입' })
    @ApiResponse({ status: 201, description: '가입 성공시 JWT_TOKEN을 발급합니다.', type: JwtTokenDto })
    async signup(@Body() signInDto: UserSigninDto) {
        return await this.authService.signup(signInDto);
    }

    @Post('/signin')
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ description: '로그인'})
    @ApiResponse({ status: 200, description: 'JWT_TOKEN을 발급합니다.', type: JwtTokenDto })
    signin(@Request() req: any) {
        return this.authService.createToken(req.user);
    }

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: '내 정보 조회(토큰 발급자만)' })
    async getProfile(@Jwt() user: CurrentUser) {
        return user;
    }
}
