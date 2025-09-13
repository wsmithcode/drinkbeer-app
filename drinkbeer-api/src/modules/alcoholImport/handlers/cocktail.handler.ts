import { Injectable, Logger } from '@nestjs/common';
import { ImportHandler } from '../interfaces/import.interface';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@modules/prisma/prisma.service';
import { AppErrors } from 'src/constant/errors/error.message';
import { RawCocktail, CocktailApiReponse, ProcessedCocktail } from '../interfaces/importCocktails.interface';

@Injectable()
export class CocktailHandler implements ImportHandler {
    private readonly logger = new Logger(CocktailHandler.name);
    private readonly REQUEST_TIMEOUT = 10000;
    private readonly MAX_INGREDIENTS = 15;

    constructor( 
        private prisma: PrismaService,
        private configService: ConfigService
    ) {}

    getEntityName() {
        return 'Cocktails';
    }

    getApiKey(): string {
        const apiKey = this.configService.get<string>('RAPIDAPI_API_KEY');
        if (!apiKey) {
            throw new Error(AppErrors.ALCOHOLIMPORT.API_KEY_MISSING('RAPIDAPI_API_KEY'));
        }
        return apiKey;
    }

    async fetchData(): Promise<RawCocktail[]> {
        this.logger.log('Fetching cocktail data from API');

        const url = 'https://the-cocktail-db.p.rapidapi.com/search.php?s=';
        const apiKey = this.getApiKey();

        try {
            const response: AxiosResponse<CocktailApiReponse> = await axios.get(url, {
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
                    'Accepts': 'application/json'
                },
                timeout: this.REQUEST_TIMEOUT,
                validateStatus: (status) => status >= 200 && status < 300
            });

            this.logger.log(`Fetched ${response.data.drinks?.length || 0} cocktails from API`);
            return response.data.drinks || [];
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message: string = error.response?.data?.lmessage || error.message;
                this.logger.error(message);
                throw new Error(message);
            }
            throw error;
        }
    }

    processItem(cocktail: RawCocktail): ProcessedCocktail {
        const ingredients: string[] = [];
        const measurements: string[] = [];

        for (let i = 1; i <= this.MAX_INGREDIENTS; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];

            if (ingredient?.trim()) {
                ingredients.push(ingredient.trim())
            };
            
            if (measure?.trim()) {
                measurements.push(measure.trim())
            }
    }

    return {
        idDrink: cocktail.idDrink,
        name: cocktail.strDrink?.trim() || '',
        category: cocktail.strCategory?.trim() || '',
        pictureUrl: cocktail.strDrinkThumb?.trim() || '',
        instructions: (cocktail.strInstructionsFR || '').trim(),
        isAlcoholic: cocktail.strAlcoholic?.trim() || '',
        glassType: cocktail.strGlass?.trim() || '',
        ingredients,
        measurements
    }
}


    async saveItem(cocktail: ProcessedCocktail): Promise<{created: boolean}> {
        try {
            const existingCocktail = await this.prisma.cocktail.findUnique({
                where: { idDrink: cocktail.idDrink},
                select: { id: true}
            })

            await this.prisma.cocktail.upsert({
                where: { idDrink: cocktail.idDrink}, 
                update: {
                    name: cocktail.name,
                    category: cocktail.category,
                    pictureUrl: cocktail.pictureUrl,
                    instructions: cocktail.instructions,
                    isAlcoholic: cocktail.isAlcoholic,
                    glassType: cocktail.glassType,
                    ingredients: cocktail.ingredients,
                    measurements: cocktail.measurements
                },
                create: {
                    idDrink: cocktail.idDrink,
                    name: cocktail.name,
                    category: cocktail.category,
                    pictureUrl: cocktail.pictureUrl,
                    instructions: cocktail.instructions,
                    isAlcoholic: cocktail.isAlcoholic,
                    glassType: cocktail.glassType,
                    ingredients: cocktail.ingredients,
                    measurements: cocktail.measurements
                }
            })

            return { created: !existingCocktail};
            this.logger.log(`Successfully saved cocktail ${cocktail.name}`);

        } catch (error) {
            this.logger.error(`Error saving cocktail ${cocktail.name}: ${error.message}`);
            throw error;
        }   
    }


}

