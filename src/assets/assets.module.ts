import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AssetsController } from './assets.controller'
import { DemplonService } from 'src/common/services/demplon.service'
import { AssetsService } from './assets.service'
import { Asset } from './entities/asset.entity'
import { Item } from './entities/item.entity'
import { Size } from './entities/size.entity'

@Module({ imports: [TypeOrmModule.forFeature([Asset, Item, Size])], controllers: [AssetsController], providers: [AssetsService, DemplonService] })
export class DocumentsModule {}
