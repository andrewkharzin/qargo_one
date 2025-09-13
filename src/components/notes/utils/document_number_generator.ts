export interface DocumentNumberOptions {
  documentType: string;
  airlineIata: string;
  warehouseCode: string;
  sequenceNumber: number;
  revision: number;
  year?: number;
}

export interface DocumentNumberResult {
  fullNumber: string;
  shortNumber: string;
  parts: {
    prefix: string;
    iata: string;
    warehouse: string;
    sequence: number;
    revision: number;
    year: number;
  };
}

export class DocumentNumberGenerator {
  private static sequenceCounters: Map<string, number> = new Map();

  static generateProcedureNumber(options: DocumentNumberOptions): DocumentNumberResult {
    const {
      documentType = 'APDT',
      airlineIata,
      warehouseCode,
      sequenceNumber,
      revision = 1,
      year = new Date().getFullYear()
    } = options;

    // Нормализуем данные
    const normalizedIata = airlineIata.toUpperCase().trim();
    const normalizedWarehouse = warehouseCode.toUpperCase().trim();
    const normalizedType = documentType.toUpperCase().trim();

    // Генерируем полный номер
    const fullNumber = `${normalizedType}-${normalizedIata}-${normalizedWarehouse}-${sequenceNumber.toString().padStart(3, '0')}-${revision.toString().padStart(2, '0')}-${year}`;

    // Генерируем короткий номер
    const shortNumber = `${normalizedType}-${normalizedIata}-${sequenceNumber.toString().padStart(3, '0')}-${revision.toString().padStart(2, '0')}`;

    return {
      fullNumber,
      shortNumber,
      parts: {
        prefix: normalizedType,
        iata: normalizedIata,
        warehouse: normalizedWarehouse,
        sequence: sequenceNumber,
        revision,
        year
      }
    };
  }

  static getNextSequenceNumber(key: string): number {
    const current = this.sequenceCounters.get(key) || 1;
    this.sequenceCounters.set(key, current + 1);
    return current;
  }

  static resetSequenceCounter(key: string): void {
    this.sequenceCounters.set(key, 1);
  }

  static parseProcedureNumber(fullNumber: string): DocumentNumberResult | null {
    try {
      const parts = fullNumber.split('-');
      if (parts.length !== 6) return null;

      const [prefix, iata, warehouse, sequenceStr, revisionStr, yearStr] = parts;

      return {
        fullNumber,
        shortNumber: `${prefix}-${iata}-${sequenceStr}-${revisionStr}`,
        parts: {
          prefix,
          iata,
          warehouse,
          sequence: parseInt(sequenceStr),
          revision: parseInt(revisionStr),
          year: parseInt(yearStr)
        }
      };
    } catch (error) {
      console.error('Error parsing document number:', error);
      return null;
    }
  }

  static validateIataCode(code: string): boolean {
    return /^[A-Z]{2,3}$/.test(code.trim().toUpperCase());
  }

  static validateWarehouseCode(code: string): boolean {
    return /^[A-ZА-Я0-9]{1,5}$/.test(code.trim().toUpperCase());
  }

  // Генерация ключа для последовательности
  static generateSequenceKey(airlineIata: string, warehouseCode: string): string {
    return `${airlineIata.toUpperCase()}-${warehouseCode.toUpperCase()}`;
  }
}
