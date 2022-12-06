import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DemplonService } from 'src/common/services/demplon.service'
import { Repository } from 'typeorm'
import { Document } from './entities/document.entity'

@Injectable()
export class DocumentsService {
	constructor(
		@InjectRepository(Document)
		private readonly documentRepository: Repository<Document>,
		private readonly demplonService: DemplonService,
	) {}

	async findAll(identity: any, token: string) {
		const me = await this.demplonService.getSelfDetail(identity, token)
		const many = await this.documentRepository.find({
			order: { document_id: 'DESC' },
			where: {
				published: '1',
				kd_pusat_bi: me.kd_pusat_biaya,
				kd_jabatan: me.kd_posisi,
				revision: '1',
			},
		})
		return many
	}
}
