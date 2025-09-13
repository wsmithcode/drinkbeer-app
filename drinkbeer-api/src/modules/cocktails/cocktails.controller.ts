import { Controller, Get } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';

@Controller('cocktails')
export class CocktailsController {

    constructor ( private readonly cocktailsService: CocktailsService ) {}

    @Get()
    async getCocktails() {
        return await this.cocktailsService.getCocktails();
    }
}