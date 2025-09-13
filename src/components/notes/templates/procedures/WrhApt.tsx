'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Hash } from 'lucide-react';
import { DocumentNumberGenerator } from '@/components/notes/utils/document_number_generator';

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

interface WrhAptProps {
  data: Partial<WrhAptData>;
  onChange: (data: Partial<WrhAptData>) => void;
}

export default function WrhApt({ data, onChange }: WrhAptProps) {
  const [sequenceNumber, setSequenceNumber] = useState<number>(1);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Автоматически генерируем номер при изменении необходимых полей
    if (data.airlineIata && data.warehouseCode) {
      const key = DocumentNumberGenerator.generateSequenceKey(data.airlineIata, data.warehouseCode);
      const nextSeq = DocumentNumberGenerator.getNextSequenceNumber(key);
      setSequenceNumber(nextSeq);
      
      generateDocumentNumber(nextSeq);
    }
  }, [data.airlineIata, data.warehouseCode]);

  const updateField = (field: keyof WrhAptData, value: any) => {
    const newData = {
      ...data,
      [field]: value
    };
    
    // Валидируем поле при изменении
    if (field === 'airlineIata' || field === 'warehouseCode') {
      validateField(field, value);
    }
    
    onChange(newData);
  };

  const validateField = (field: string, value: string) => {
    const errors: Record<string, string> = { ...validationErrors };
    
    if (field === 'airlineIata' && value) {
      if (!DocumentNumberGenerator.validateIataCode(value)) {
        errors.airlineIata = 'IATA код должен содержать 2-3 латинские буквы';
      } else {
        delete errors.airlineIata;
      }
    }
    
    if (field === 'warehouseCode' && value) {
      if (!DocumentNumberGenerator.validateWarehouseCode(value)) {
        errors.warehouseCode = 'Код склада должен содержать 1-5 букв или цифр';
      } else {
        delete errors.warehouseCode;
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateDocumentNumber = (seqNumber: number) => {
    if (!data.airlineIata || !data.warehouseCode) return;

    const result = DocumentNumberGenerator.generateProcedureNumber({
      documentType: 'APDT',
      airlineIata: data.airlineIata,
      warehouseCode: data.warehouseCode,
      sequenceNumber: seqNumber,
      revision: data.revision || 1
    });

    onChange({
      ...data,
      documentNumber: result.fullNumber,
      sequenceNumber: seqNumber
    });
  };

  const handleRevisionChange = (newRevision: number) => {
    updateField('revision', newRevision);
    if (data.airlineIata && data.warehouseCode) {
      generateDocumentNumber(sequenceNumber);
    }
  };

  const addContact = () => {
    const newContacts = [...(data.contacts || []), { name: '', role: '', phone: '', email: '' }];
    updateField('contacts', newContacts);
  };

  const removeContact = (index: number) => {
    const newContacts = [...(data.contacts || [])];
    newContacts.splice(index, 1);
    updateField('contacts', newContacts);
  };

  const updateContact = (index: number, field: string, value: string) => {
    const newContacts = [...(data.contacts || [])];
    newContacts[index] = { ...newContacts[index], [field]: value };
    updateField('contacts', newContacts);
  };

  const addStaff = () => {
    const newStaff = [...(data.dutyStaff || []), { name: '', shift: '', responsibilities: '' }];
    updateField('dutyStaff', newStaff);
  };

  const removeStaff = (index: number) => {
    const newStaff = [...(data.dutyStaff || [])];
    newStaff.splice(index, 1);
    updateField('dutyStaff', newStaff);
  };

  const updateStaff = (index: number, field: string, value: string) => {
    const newStaff = [...(data.dutyStaff || [])];
    newStaff[index] = { ...newStaff[index], [field]: value };
    updateField('dutyStaff', newStaff);
  };

  const addEquipment = () => {
    const newEquipment = [...(data.requiredEquipment || []), ''];
    updateField('requiredEquipment', newEquipment);
  };

  const removeEquipment = (index: number) => {
    const newEquipment = [...(data.requiredEquipment || [])];
    newEquipment.splice(index, 1);
    updateField('requiredEquipment', newEquipment);
  };

  const updateEquipment = (index: number, value: string) => {
    const newEquipment = [...(data.requiredEquipment || [])];
    newEquipment[index] = value;
    updateField('requiredEquipment', newEquipment);
  };

  const addDocument = () => {
    const newDocs = [...(data.documentationRequirements || []), ''];
    updateField('documentationRequirements', newDocs);
  };

  const removeDocument = (index: number) => {
    const newDocs = [...(data.documentationRequirements || [])];
    newDocs.splice(index, 1);
    updateField('documentationRequirements', newDocs);
  };

  const updateDocument = (index: number, value: string) => {
    const newDocs = [...(data.documentationRequirements || [])];
    newDocs[index] = value;
    updateField('documentationRequirements', newDocs);
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-slate-50">
      <h3 className="text-lg font-semibold">Airline Procedure Template - Warehouse</h3>
      
      {/* Информация об авиакомпании */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="airlineIata">IATA код авиакомпании *</Label>
          <Input
            value={data.airlineIata || ''}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              validateField('airlineIata', value);
              updateField('airlineIata', value);
            }}
            placeholder="SU, AY, LH..."
            maxLength={3}
            className="font-mono"
          />
          {validationErrors.airlineIata && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.airlineIata}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="airlineName">Название авиакомпании *</Label>
          <Input
            value={data.airlineName || ''}
            onChange={(e) => updateField('airlineName', e.target.value)}
            placeholder="Aeroflot, Finnair, Lufthansa..."
          />
        </div>
      </div>

      {/* Информация о складе */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="warehouseName">Название склада/агента *</Label>
          <Input
            value={data.warehouseName || ''}
            onChange={(e) => updateField('warehouseName', e.target.value)}
            placeholder="OOO Москва-Карго"
          />
        </div>
        
        <div>
          <Label htmlFor="warehouseCode">Код склада (2-5 символов) *</Label>
          <Input
            value={data.warehouseCode || ''}
            onChange={(e) => {
              const value = e.target.value.toUpperCase().replace(/[^A-ZА-Я0-9]/g, '');
              validateField('warehouseCode', value);
              updateField('warehouseCode', value);
            }}
            placeholder="МК, SVO, DME..."
            maxLength={5}
            className="font-mono"
          />
          {validationErrors.warehouseCode && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.warehouseCode}</p>
          )}
        </div>
      </div>

      {/* Номер документа и ревизия */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="sequenceNumber">Порядковый номер</Label>
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-gray-500" />
            <Input
              type="number"
              min="1"
              value={sequenceNumber}
              onChange={(e) => {
                const newSeq = parseInt(e.target.value) || 1;
                setSequenceNumber(newSeq);
                generateDocumentNumber(newSeq);
              }}
              className="font-mono"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="revision">Ревизия</Label>
          <Input
            type="number"
            min="1"
            value={data.revision || 1}
            onChange={(e) => handleRevisionChange(parseInt(e.target.value) || 1)}
          />
        </div>
        
        <div>
          <Label htmlFor="effectiveDate">Дата вступления в силу</Label>
          <Input
            type="date"
            value={data.effectiveDate || ''}
            onChange={(e) => updateField('effectiveDate', e.target.value)}
          />
        </div>
      </div>

      {/* Отображение сгенерированного номера */}
      {data.documentNumber && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <Label className="block mb-2 font-semibold">Номер документа:</Label>
          <div className="text-xl font-mono font-bold text-blue-800 bg-white p-3 rounded border">
            {data.documentNumber}
          </div>
          <p className="text-sm text-blue-600 mt-2">
            Формат: APDT-{data.airlineIata || 'IATA'}-{data.warehouseCode || 'CODE'}-XXX-XX-YYYY
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cargoType">Cargo Type</Label>
          <Select
            value={data.cargoType || ''}
            onValueChange={(value: WrhAptData['cargoType']) => updateField('cargoType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select cargo type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="dangerous">Dangerous</SelectItem>
              <SelectItem value="special">Special</SelectItem>
              <SelectItem value="perishable">Perishable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="handlingProcedure">Handling Procedure</Label>
        <Textarea
          value={data.handlingProcedure || ''}
          onChange={(e) => updateField('handlingProcedure', e.target.value)}
          placeholder="Step-by-step handling procedure..."
          rows={4}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Required Equipment</Label>
          <Button type="button" variant="outline" size="sm" onClick={addEquipment}>
            <Plus className="h-4 w-4 mr-1" /> Add Equipment
          </Button>
        </div>
        <div className="space-y-2">
          {data.requiredEquipment?.map((equipment, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={equipment}
                onChange={(e) => updateEquipment(index, e.target.value)}
                placeholder="Equipment name"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeEquipment(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="safetyPrecautions">Safety Precautions</Label>
        <Textarea
          value={data.safetyPrecautions || ''}
          onChange={(e) => updateField('safetyPrecautions', e.target.value)}
          placeholder="Safety precautions and warnings..."
          rows={3}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Contacts</Label>
          <Button type="button" variant="outline" size="sm" onClick={addContact}>
            <Plus className="h-4 w-4 mr-1" /> Add Contact
          </Button>
        </div>
        <div className="space-y-4">
          {data.contacts?.map((contact, index) => (
            <div key={index} className="p-3 border rounded-md bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Contact #{index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeContact(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  placeholder="Name"
                  value={contact.name}
                  onChange={(e) => updateContact(index, 'name', e.target.value)}
                />
                <Input
                  placeholder="Role"
                  value={contact.role}
                  onChange={(e) => updateContact(index, 'role', e.target.value)}
                />
                <Input
                  placeholder="Phone"
                  value={contact.phone}
                  onChange={(e) => updateContact(index, 'phone', e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => updateContact(index, 'email', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Duty Staff</Label>
          <Button type="button" variant="outline" size="sm" onClick={addStaff}>
            <Plus className="h-4 w-4 mr-1" /> Add Staff
          </Button>
        </div>
        <div className="space-y-4">
          {data.dutyStaff?.map((staff, index) => (
            <div key={index} className="p-3 border rounded-md bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Staff #{index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeStaff(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  placeholder="Name"
                  value={staff.name}
                  onChange={(e) => updateStaff(index, 'name', e.target.value)}
                />
                <Input
                  placeholder="Shift"
                  value={staff.shift}
                  onChange={(e) => updateStaff(index, 'shift', e.target.value)}
                />
                <div className="md:col-span-2">
                  <Input
                    placeholder="Responsibilities"
                    value={staff.responsibilities}
                    onChange={(e) => updateStaff(index, 'responsibilities', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="emergencyProcedures">Emergency Procedures</Label>
        <Textarea
          value={data.emergencyProcedures || ''}
          onChange={(e) => updateField('emergencyProcedures', e.target.value)}
          placeholder="Emergency procedures and contacts..."
          rows={3}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Documentation Requirements</Label>
          <Button type="button" variant="outline" size="sm" onClick={addDocument}>
            <Plus className="h-4 w-4 mr-1" /> Add Document
          </Button>
        </div>
        <div className="space-y-2">
          {data.documentationRequirements?.map((doc, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={doc}
                onChange={(e) => updateDocument(index, e.target.value)}
                placeholder="Document name"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeDocument(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {(data.cargoType === 'perishable' || data.cargoType === 'special') && (
        <div>
          <Label htmlFor="temperatureControl">Temperature Control Requirements</Label>
          <Input
            value={data.temperatureControl || ''}
            onChange={(e) => updateField('temperatureControl', e.target.value)}
            placeholder="Temperature range and monitoring requirements"
          />
        </div>
      )}

      {data.cargoType === 'special' && (
        <div>
          <Label htmlFor="specialHandlingInstructions">Special Handling Instructions</Label>
          <Textarea
            value={data.specialHandlingInstructions || ''}
            onChange={(e) => updateField('specialHandlingInstructions', e.target.value)}
            placeholder="Any special handling instructions..."
            rows={2}
          />
        </div>
      )}
    </div>
  );
}