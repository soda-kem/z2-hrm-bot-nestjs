import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/index'
import { ConsoleEntity } from '../../entities/Console.entity'
import * as captureConsole from 'capture-console'
const stripAnsi = require('strip-ansi')

@Injectable()
export class HrmBotService {
  constructor(
    @InjectRepository(ConsoleEntity)
    private consoleEntityRepository: Repository<ConsoleEntity>
  ) {}

  async onModuleInit() {
    captureConsole.startCapture(process.stdout, async stdout => {
      const contents = stripAnsi(stdout)
        .split('\n')
        .filter(content => content)
        .map(content => {
          return {
            content
          }
        })

      await this.consoleEntityRepository.save(contents)
    })
    await this.consoleEntityRepository
      .createQueryBuilder()
      .delete()
      .execute()
  }
}
