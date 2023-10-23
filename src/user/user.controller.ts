import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('/api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * 
   * @param suggestion
   * @returns insert suggestion boolean
   */
  @ApiOperation({ description: 'signin' })
  @Post('signin')
  async sendSuggestion(@Body() body: { id: string; pw: string }) {
    return this.userService.signin(body.id, body.pw);
  }

}
