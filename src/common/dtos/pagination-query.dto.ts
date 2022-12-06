import { Expose } from 'class-transformer'
import { IsOptional, IsPositive } from 'class-validator'

export class PaginationQueryDto {
	@Expose()
	@IsOptional()
	@IsPositive()
	page: number
}
