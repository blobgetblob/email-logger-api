import { Exclude } from 'class-transformer'
import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tb_size_value')
export class Size {
	@PrimaryGeneratedColumn()
	size_value_id: number

	@Column()
	size_value_name: string

	@Column()
	size_id: number

	@Column()
	@Exclude({ toPlainOnly: true })
	created_at: Date

	@Column()
	@Exclude({ toPlainOnly: true })
	created_by: string

	@Column()
	@Exclude({ toPlainOnly: true })
	updated_at: Date

	@Column()
	@Exclude({ toPlainOnly: true })
	updated_by: string

	@Column()
	@Exclude({ toPlainOnly: true })
	deleted: boolean

	@Column()
	@Exclude({ toPlainOnly: true })
	deleted_at: Date

	@Column()
	@Exclude({ toPlainOnly: true })
	deleted_by: string

	@Column()
	@Exclude({ toPlainOnly: true })
	recovered: boolean

	@Column()
	@Exclude({ toPlainOnly: true })
	recovered_at: Date

	@Column()
	@Exclude({ toPlainOnly: true })
	recovered_by: string
}
