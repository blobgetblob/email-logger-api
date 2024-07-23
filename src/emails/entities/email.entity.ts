import { Exclude } from 'class-transformer'
import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('emails')
export class Email {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

	@Column()
	from: number

	@Column()
	type: string

	@Column()
	link: string

	@Column()
	code: string

	@Column()
	text: string

	@Column()
	created_at: Date

	@Column()
	updated_at: Date
}
