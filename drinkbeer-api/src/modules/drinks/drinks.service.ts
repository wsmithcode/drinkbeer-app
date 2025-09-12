import { Injectable } from '@nestjs/common';

@Injectable()
export class DrinksService {
    
    async getDrinks() {
        return ['Beer', 'Wine', 'Whiskey'];
    }
}