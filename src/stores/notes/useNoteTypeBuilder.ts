import { create } from 'zustand';
import { nanoid } from 'nanoid';

export type FieldType = 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox';

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  options?: string[]; // Для select
  required: boolean;
}

interface NoteTypeBuilderState {
  fields: Field[];
  addField: (field: Omit<Field, 'id'>) => void;
  removeField: (id: string) => void;
  updateField: (id: string, data: Partial<Field>) => void;
  reorderFields: (startIndex: number, endIndex: number) => void;
  reset: () => void;
}

export const useNoteTypeBuilder = create<NoteTypeBuilderState>((set) => ({
  fields: [],
  addField: (field) =>
    set((state) => ({ fields: [...state.fields, { ...field, id: nanoid() }] })),
  removeField: (id) => set((state) => ({ fields: state.fields.filter(f => f.id !== id) })),
  updateField: (id, data) =>
    set((state) => ({
      fields: state.fields.map(f => f.id === id ? { ...f, ...data } : f)
    })),
  reorderFields: (startIndex, endIndex) => set((state) => {
    const updated = Array.from(state.fields);
    const [removed] = updated.splice(startIndex, 1);
    updated.splice(endIndex, 0, removed);
    return { fields: updated };
  }),
  reset: () => set({ fields: [] }),
}));
