import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/index'
import { ConsoleEntity } from '../../entities/Console.entity'

@Injectable()
export class ConsoleService {
  constructor(
    @InjectRepository(ConsoleEntity)
    private consoleEntityRepository: Repository<ConsoleEntity>
  ) {}

  async onModuleInit() {
    await this.consoleEntityRepository
      .createQueryBuilder()
      .delete()
      .execute()
  }

  async getLogs(): Promise<any> {
    for (let i = 1; i < 30; i++) {
      console.log(i)
    }
    return await this.consoleEntityRepository.createQueryBuilder().getMany()
  }
}
