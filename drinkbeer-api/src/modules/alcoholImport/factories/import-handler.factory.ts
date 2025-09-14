import { Injectable } from '@nestjs/common';
import { ImportHandler } from '../interfaces/import.interface';
import { CocktailHandler } from '../handlers/cocktail.handler';
import { BeerHandler } from '../handlers/beer.handler';
import { PrismaService } from '@modules/prisma/prisma.service';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class ImportHandlerFactory {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  createHandler(entityType: string): ImportHandler {
    switch (entityType) {
      case 'cocktails':
        return new CocktailHandler(this.prisma, this.configService);
      case 'beers':
        return new BeerHandler(this.prisma);
      default:
        throw new Error(`No handler found for entity type: ${entityType}`);
    }
  }

  getSupportedTypes(): string[] {
    return ['cocktails'];
  }
}
