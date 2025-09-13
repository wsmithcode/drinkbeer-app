import { Controller, Param, Post } from '@nestjs/common';
import { ImportService } from '../service/import.service';

@Controller('alcohol-import')
export class AlcoholImportController {

    constructor ( private readonly importService: ImportService ) {}

    @Post(':type')
    async importCocktails(@Param('type') type: string) {
        return await this.importService.importAlcohol(type);
    }

}