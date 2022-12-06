import { Exclude } from 'class-transformer'
import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tb_assets')
export class Item {
	@PrimaryGeneratedColumn()
	asset_id: number

	@Column()
	asset_name: string

	@Column()
	asset_image: string

	@Column()
	size_type: number

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

	sizes: any
	asset: any
}
