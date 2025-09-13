import { Module } from '@nestjs/common';
import { CocktailsController } from './cocktails.controller';
import { CocktailsService } from './cocktails.service';

@Module({
    controllers: [CocktailsController],
    providers: [CocktailsService],
    imports: []
})

export class CocktailsModule {}