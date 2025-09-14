import { Injectable, Logger } from '@nestjs/common';
import { ImportResult } from '../interfaces/import.interface';
import { ImportHandlerFactory } from '../factories/import-handler.factory';
@Injectable()
export class ImportService {
  private readonly logger = new Logger(ImportService.name);
  private BATCH_SIZE = 500;

  constructor(private readonly handlerFactory: ImportHandlerFactory) {}

  async importAlcohol(alcoholTypes: string): Promise<ImportResult> {
    const startTime = Date.now();
    this.logger.log(`Starting import for type: ${alcoholTypes}`);

    try {
      const handler = this.handlerFactory.createHandler(alcoholTypes);
      const rawData = await handler.fetchData();
      if (!rawData || rawData.length === 0) {
        this.logger.warn(`No data fetched for type: ${alcoholTypes}`);
        return {
          success: false,
          message: `No data fetched for type: ${alcoholTypes}`,
          stats: { totalProcessed: 0, created: 0, updated: 0, errors: 0 },
        };
      }

      this.logger.log(
        `Fetched ${rawData.length} items for type: ${alcoholTypes}`
      );
      const result = await this.processBatch(rawData, handler);

      const duration = Date.now() - startTime;
      this.logger.log(
        `Import completed in ${duration}ms for type: ${alcoholTypes} - ${result.stats?.totalProcessed} items processed`
      );

      return {
        ...result,
        message: `Import completed for type: ${alcoholTypes}`,
      };
    } catch (error) {
      this.logger.error(`Error during import for type: ${alcoholTypes}`, error);
      return {
        success: false,
        message: `Import failed for type: ${alcoholTypes}`,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      };
    }
  }

  private async processBatch(
    rawData: any[],
    handler: any
  ): Promise<ImportResult> {
    const stats = { totalProcessed: 0, created: 0, updated: 0, errors: 0 };
    const errors: string[] = [];

    for (let i = 0; i < rawData.length; i += this.BATCH_SIZE) {
      const batch = rawData.slice(i, i + this.BATCH_SIZE);
      const batchNumber = Math.floor(i / this.BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(rawData.length / this.BATCH_SIZE);

      this.logger.debug(
        `Processing batch ${batchNumber}/${totalBatches} (${batch.length} items)`
      );

      const batchPromises = batch.map(async rawItem => {
        try {
          const processedItem = handler.processItem(rawItem);
          const result = await handler.saveItem(processedItem);

          stats.totalProcessed++;
          result.created ? stats.created++ : stats.updated++;
        } catch (error) {
          stats.errors++;
          const errorMsg = `Error processing item: ${error instanceof Error ? error.message : 'Unknown error'}`;
          errors.push(errorMsg);
          this.logger.error(errorMsg);
        }
      });

      await Promise.allSettled(batchPromises);
    }

    return {
      success: stats.errors < stats.totalProcessed / 2,
      message: `Import completed: ${stats.created} created, ${stats.updated} updated, ${stats.errors} errors`,
      stats,
      errors: errors.length > 0 ? errors.slice(0, 10) : undefined,
    };
  }
}
