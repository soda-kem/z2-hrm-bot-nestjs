import { Module } from '@nestjs/common'
import { HrmBotService } from './hrm-bot.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { HrmBotController } from './hrm-bot.controller'
import { ConsoleEntity } from '../../entities/Console.entity'

@Module({
  controllers: [HrmBotController],
  providers: [HrmBotService],
  imports: [TypeOrmModule.forFeature([ConsoleEntity]), AuthModule]
})
export class HrmBotModule {}
