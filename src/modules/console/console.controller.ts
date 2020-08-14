import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ConsoleService } from './console.service'
import { ApiResponse } from '../../share/api-response'

@ApiTags('consoles')
@Controller('consoles')
export class ConsoleController {
  constructor(private consoleService: ConsoleService) {}

  @Get('/')
  async index(): Promise<ApiResponse> {
    return ApiResponse.create(await this.consoleService.getLogs())
  }
}
