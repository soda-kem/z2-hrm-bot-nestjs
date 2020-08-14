import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { AuthGuard } from '../auth/guards/auth.guard'
import { UserFavoriteParamDto } from './dtos/user-favorite-param.dto'
import { User } from '../auth/decorators/user.decorator'
import { UserEntity } from '../../entities/User.entity'
import { ApiResponse } from '../../share/api-response'
import { UserListDto } from './dtos/user-list.dto'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async index(@Query() queries: UserListDto): Promise<ApiResponse> {
    return ApiResponse.create(await this.userService.getUsers(queries))
  }

  @Get(':id/favorite')
  async favorite(@Param() { id }: UserFavoriteParamDto, @User() user: UserEntity): Promise<ApiResponse> {
    const favorite = await this.userService.favorite(id, user.id)
    return ApiResponse.create({ favorite: favorite })
  }
}
