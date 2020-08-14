import { IsArray, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'
import { transformArrayNumber, validArrayNumber } from '../../../transforms/dto.transform'
import { IsArrayType } from '../../../validators/IsArrayType'

export class UserListDto {
  @IsOptional()
  @Transform(transformArrayNumber)
  @IsArrayType(validArrayNumber, 'number')
  @IsArray()
  genders: Array<number>
}
