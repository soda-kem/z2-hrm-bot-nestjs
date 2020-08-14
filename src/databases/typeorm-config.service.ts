import { Injectable } from '@nestjs/common'
import { ConfigService, ConfigType } from '@nestjs/config'
import databaseConfig, { DATABASE_CONFIG_NAME } from '../configs/database.config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { TypeOrmOptionsFactory } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface'
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | SqliteConnectionOptions {
    const { typeorm } = this.configService.get<ConfigType<typeof databaseConfig>>(DATABASE_CONFIG_NAME)
    return {
      type: 'sqlite',
      database: typeorm.database,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: typeorm.synchronize,
      migrationsRun: typeorm.migrationsRun,
      logging: typeorm.logging
    }
  }
}
