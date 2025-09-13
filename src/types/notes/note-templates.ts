interface WrhAptData {
  airlineIata: string;
  airlineName: string;
  warehouseName: string;
  warehouseCode: string;
  revision: number;
  effectiveDate: string;
  documentNumber?: string;
  sequenceNumber?: number;
  cargoType: 'general' | 'dangerous' | 'special' | 'perishable';
  handlingProcedure: string;
  requiredEquipment: string[];
  safetyPrecautions: string;
  contacts: {
    name: string;
    role: string;
    phone: string;
    email: string;
  }[];
  dutyStaff: {
    name: string;
    shift: string;
    responsibilities: string;
  }[];
  emergencyProcedures: string;
  documentationRequirements: string[];
  temperatureControl?: string;
  specialHandlingInstructions?: string;
}
