import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { ImportHandler } from '../interfaces/import.interface';
import axios from 'axios';

@Injectable()
export class BeerHandler implements ImportHandler {
  private readonly logger = new Logger(BeerHandler.name);
  private readonly REQUEST_TIMEOUT = 30000;

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  getEntityName(): string {
    return 'Beers';
  }

  getApiKey(): string {
    return '';
  }

  async fetchData(): Promise<any[]> {
    this.logger.log('Downloading WineVybe beer list');

    const url = 'https://winevybe.com/v/beerapi/beers-master-list-2023.txt';

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: 'text/plain',
          'User-Agent': 'BeerImporter/1.0',
        },
        timeout: this.REQUEST_TIMEOUT,
        responseType: 'text',
      });

      const textContent = response.data;
      this.logger.log(`📄 Downloaded ${textContent.length} characters`);
      const beers = this.parseTextToBeers(textContent);

      this.logger.log(`🍺 Parsed ${beers.length} beers from master list`);
      return beers;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = `WineVybe API Error: ${error.response?.status} - ${error.message}`;
        this.logger.error(message);
        throw new Error(message);
      }
      throw error;
    }
  }

  private parseTextToBeers(textContent: string): any[] {
    const lines = textContent.split('\n').filter(line => line.trim() !== '');
    const beers: any[] = [];

    this.logger.log(`📋 Processing ${lines.length} lines...`);

    lines.forEach((line, index) => {
      try {
        const parsedBeer = this.parseBeerLine(line.trim(), index);
        if (parsedBeer) {
          beers.push(parsedBeer);
        }
      } catch (error) {
        this.logger.warn(
          `⚠️ Failed to parse line ${index + 1}: "${line}" - ${error.message}`
        );
      }
    });

    this.logger.log(`✅ Successfully parsed ${beers.length} beers`);
    return beers;
  }

  private parseBeerLine(line: string, lineIndex: number): any | null {
    if (!line || line.length < 3) {
      return null;
    }

    return {
      lineIndex: lineIndex + 1,
      beerName: line.trim()
    };
  }

  processItem(rawBeer: any): any {
    return {
      idBeer: `winevybe-${rawBeer.lineIndex}`,
      name: rawBeer.beerName, 
      brands: null,
      category: [],
      pictureUrl: null,
      country: null,
      abv: null,
    };
  }

  async saveItem(beer: any): Promise<{ created: boolean }> {
    try {
      const existingBeer = await this.prisma.beer.findFirst({
        where: { name: beer.name },
        select: { id: true },
      });

      if (existingBeer) {
        await this.prisma.beer.update({
          where: { id: existingBeer.id },
          data: {
            idBeer: beer.idBeer,
            name: beer.name,
            brands: beer.brands,
            category: beer.category,
            pictureUrl: beer.pictureUrl,
            country: beer.country,
            abv: beer.abv,
          },
        });
        return { created: false };
      } else {
        await this.prisma.beer.create({
          data: {
            idBeer: beer.idBeer,
            name: beer.name,
            brands: beer.brands,
            category: beer.category,
            pictureUrl: beer.pictureUrl,
            country: beer.country,
            abv: beer.abv,
          },
        });

        return { created: true };
      }
    } catch (error) {
      this.logger.error(`❌ Error saving beer ${beer.name}:`, error);
      throw error;
    }
  }
}