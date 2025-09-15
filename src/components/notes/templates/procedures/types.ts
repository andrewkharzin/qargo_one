// templates/wrh-apt/types.ts
export interface WrhAptData {
  // Основная информация
  airlineIata: string;
  airlineName: string;
  warehouseName: string;
  warehouseCode: string;
  revision: number;
  effectiveDate: string;

  // Автоматически генерируемые поля
  documentNumber?: string;
  sequenceNumber?: number;

  // Информация о грузе
  cargoType: 'general' | 'dangerous' | 'special' | 'perishable';
  handlingProcedure: string;
  requiredEquipment: string[];
  safetyPrecautions: string;

  // Контакты
  contacts: {
    name: string;
    role: string;
    phone: string;
    email: string;
  }[];

  // Персонал
  dutyStaff: {
    name: string;
    shift: string;
    responsibilities: string;
  }[];

  // Дополнительная информация
  emergencyProcedures: string;
  documentationRequirements: string[];
  temperatureControl?: string;
  specialHandlingInstructions?: string;
}
