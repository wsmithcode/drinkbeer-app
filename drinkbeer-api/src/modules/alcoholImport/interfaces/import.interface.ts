export interface ImportStats {
  totalProcessed: number;
  created: number;
  updated: number;
  errors: number;
}

export interface ImportResult {
  success: boolean;
  message: string;
  stats?: ImportStats;
  errors?: string[];
}


export interface ImportHandler {
    fetchData(): Promise<any[]>;
    processItem(rawItem: any): any;
    saveItem(processedItem: any): Promise<{ created: boolean}>;
    getEntityName(): string;
    getApiKey(): string;
}