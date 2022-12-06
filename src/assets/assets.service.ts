import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DemplonService } from 'src/common/services/demplon.service'
import { Repository } from 'typeorm'
import { Asset } from './entities/asset.entity'
import { Item } from './entities/item.entity'
import { Size } from './entities/size.entity'

@Injectable()
export class AssetsService {
	constructor(
		@InjectRepository(Asset)
		private readonly assetRepository: Repository<Asset>,
		@InjectRepository(Item)
		private readonly itemRepository: Repository<Item>,
		@InjectRepository(Size)
		private readonly sizeRepository: Repository<Size>,
		private readonly demplonService: DemplonService,
	) {}

	async findAll(identity: any) {
		const all = []
		const allRaw = await this.itemRepository.find({
			where: {
				deleted: false,
			},
		})
		await Promise.all(
			allRaw.map(async (val) => {
				try {
					const sizesMany = await this.sizeRepository.find({
						where: {
							deleted: false,
							size_id: val.size_type,
						},
					})
					val.sizes = sizesMany
					const assetOne = await this.assetRepository.findOne({
						where: {
							deleted: false,
							no_badge: identity.EMPLOYEEID,
							asset_id: val.asset_id,
						},
					})
					val.asset = assetOne ? assetOne : null
					all.push(val)
				} catch (_) {}
			}),
		)
		all.sort((a, b) => a.asset_id - b.asset_id)
		return all
	}

	async findOne(identity: any, id: string) {
		const one = await this.itemRepository.findOne({
			order: { asset_id: 'ASC' },
			where: {
				deleted: false,
				asset_id: id,
			},
		})
		if (!one) {
			throw new NotFoundException(`Data with id #${id} not found`)
		}
		try {
			const sizesMany = await this.sizeRepository.find({
				where: {
					deleted: false,
					size_id: one.size_type,
				},
			})
			one.sizes = sizesMany
			const assetOne = await this.assetRepository.findOne({
				where: {
					deleted: false,
					no_badge: identity.EMPLOYEEID,
					asset_id: one.asset_id,
				},
			})
			one.asset = assetOne ? assetOne : null
		} catch (_) {}
		return one
	}

	async patchOne(identity: any, id: string, size_value: string) {
		if (!size_value) {
			throw new BadRequestException(`Nees size value body parameter`)
		}
		const one = await this.itemRepository.findOne({
			order: { asset_id: 'ASC' },
			where: {
				deleted: false,
				asset_id: id,
			},
		})
		if (!one) {
			throw new NotFoundException(`Data with id #${id} not found`)
		}
		const assetOne = await this.assetRepository.findOne({
			where: {
				deleted: false,
				no_badge: identity.EMPLOYEEID,
				asset_id: one.asset_id,
			},
		})
		if (assetOne) {
			assetOne.size_value = size_value
			assetOne.updated_at = new Date()
			assetOne.updated_by = identity.EMPLOYEEID
			await this.assetRepository.save(assetOne)
		} else {
			const createAsset = this.assetRepository.create({})
			createAsset.no_badge = identity.EMPLOYEEID
			createAsset.asset_id = one.asset_id
			createAsset.size_value = size_value
			createAsset.created_at = new Date()
			createAsset.created_by = identity.EMPLOYEEID
			await this.assetRepository.save(createAsset)
		}
		return await this.findOne(identity, id)
	}
}
