import { Injectable } from '@nestjs/common';

@Injectable()
export class CocktailsService {

    async getCocktails() {
        return ['Margarita', 'Mojito', 'Old Fashioned'];
    }
}