// Поля шаблонов
export interface TemplateField {
  field_name: string;
  field_type: string;
  options: string[];
  required: boolean;
}

// Результат генерации номера документа
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

// Возможные типы документов
export type NoteType =
  | 'note'
  | 'quick_note'
  | 'bookmark'
  | 'procedure'
  | 'wrh_apt'
  | 'checklist'
  | 'template'
  | 'sop'
  | 'workflow'
  | 'problem'
  | 'incident'
  | 'solution'
  | 'workaround'
  | 'risk'
  | 'client_request'
  | 'client_feedback'
  | 'complaint'
  | 'approval'
  | 'email'
  | 'message'
  | 'meeting_notes'
  | 'call_summary'
  | 'knowledge_base'
  | 'training'
  | 'best_practice'
  | 'lesson_learned'
  | 'reminder'
  | 'alert'
  | 'auto_generated'
  | 'system_log'
  | 'booking_notes'
  | 'flight_notes'
  | 'airline_notes'
  | 'airport_notes'
  | 'emergency'
  | 'legal'
  | 'compliance'
  | 'audit'
  | 'task';
