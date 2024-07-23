import { IsOptional, IsString } from 'class-validator'

export class EmailFilterQueryDto {
	@IsOptional()
	@IsString()
	email: string

	@IsOptional()
	@IsString()
	type: string
}
