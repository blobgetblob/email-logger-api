import { Exclude } from 'class-transformer'
import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tb_emp_assets')
export class Asset {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	no_badge: string

	@Column()
	asset_id: number

	@Column()
	size_value: string

	@Column()
	note: string

	@Column()
	created_at: Date

	@Column()
	@Exclude({ toPlainOnly: true })
	created_by: string

	@Column()
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
