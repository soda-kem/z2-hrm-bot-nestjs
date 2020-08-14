import { Module } from '@nestjs/common'
import { ConsoleService } from './console.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { ConsoleController } from './console.controller'
import { ConsoleEntity } from '../../entities/Console.entity'

@Module({
  controllers: [ConsoleController],
  providers: [ConsoleService],
  imports: [TypeOrmModule.forFeature([ConsoleEntity]), AuthModule]
})
export class ConsoleModule {}
