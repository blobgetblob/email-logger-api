import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('documents')
export class Document {
	@PrimaryGeneratedColumn()
	document_id: number

	@Column()
	document_name: string

	@Column()
	document_desc: number

	@Column()
	file: string

	@Column()
	kd_pusat_bi: string

	@Column()
	kd_jabatan: string

	@Column()
	revision: string

	@Column()
	view: number

	@Column()
	date_created: Date

	@Column()
	date_updated: Date

	@Column()
	created_by: string

	@Column()
	published: string

	@Column()
	status: string

	@Column()
	costcenter: string

	document_url: string
	download_url: string

	@AfterLoad()
	async composeDocumentUrl() {
		this.document_url = process.env.EMPA_WEB + process.env.ATTACHMENTS_LOCATION_WEB + this.file
	}

	@AfterLoad()
	async composeDownloadUrl() {
		this.download_url = process.env.EMPA_WEB + process.env.ATTACHMENTS_DOWNLOAD_WEB + this.document_id
	}
}
