import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Document } from './entities/document.entity'
import { DocumentsController } from './documents.controller'
import { DocumentsService } from './documents.service'
import { DemplonService } from 'src/common/services/demplon.service'

@Module({ imports: [TypeOrmModule.forFeature([Document])], controllers: [DocumentsController], providers: [DocumentsService, DemplonService] })
export class DocumentsModule {}
