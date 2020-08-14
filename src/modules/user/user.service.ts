import { Injectable } from '@nestjs/common'
import { UserEntity } from '../../entities/User.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/index'
import { UserListDto } from './dtos/user-list.dto'
import { UserListResponse } from '../../interfaces/responses/user/UserListResponse'
import { UserListTransform } from '../../transforms/user-list.transform'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async getUsers(queries: UserListDto): Promise<UserListResponse> {
    const users = await this.userRepository.createQueryBuilder().getMany()
    return UserListTransform.transformUsers(users)
  }

  async favorite(id: number, userId: number): Promise<boolean> {
    console.log(id, userId)
    return true
  }
}
