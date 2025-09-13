export interface RawCocktail {
    idDrink: string;
    strDrink?: string;
    strCategory?: string;
    strAlcoholic?: string;
    strGlass?: string;
    strInstructionsFR?: string;
    strDrinkThumb?: string;
    [key: `strIngredient${number}`]: string | null;
    [key: `strMeasure${number}`]: string | null;
}

export interface ProcessedCocktail {
    idDrink: string;
    name: string;
    category: string;
    pictureUrl: string;
    instructions: string;
    isAlcoholic: string;
    glassType: string;
    ingredients: string[];
    measurements: string[];
}

export interface CocktailApiReponse {
    drinks?: RawCocktail[] | null;
}