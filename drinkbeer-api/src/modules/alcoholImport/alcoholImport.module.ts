import { Module } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { AlcoholImportController}   from './controller/alcoholImport.controller';
import { CocktailHandler } from './handlers/cocktail.handler';
import { ImportHandlerFactory } from './factories/import-handler.factory';
import { ConfigService } from '@nestjs/config';
import { ImportService } from './service/import.service';

@Module({
    providers: [ PrismaService, CocktailHandler, ImportHandlerFactory, ImportService, ConfigService ],
    controllers: [ AlcoholImportController ],
    imports: [],
    exports: [ImportService]
})
export class AlcoholImportModule {}