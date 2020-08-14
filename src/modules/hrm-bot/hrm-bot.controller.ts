import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HrmBotService } from './hrm-bot.service'
import { ApiResponse } from '../../share/api-response'

@ApiTags('hrmBot')
@Controller('hrmBot')
export class HrmBotController {
  constructor(private hrmBotService: HrmBotService) {}
}
