// src/entities/Note.ts
import { BaseEntity } from '@/entities/BaseEntity';
import { NoteRow, NoteInsert, NoteUpdate } from '../../../supabase/types';

export class Note extends BaseEntity {
  tableName = 'notes';

  async list(orderBy: string = '-updated_at'): Promise<NoteRow[]> {
    const [field, direction] = orderBy.startsWith('-')
      ? [orderBy.slice(1), 'desc']
      : [orderBy, 'asc'];

    // Здесь реализация запроса к Supabase
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .order(field, { ascending: direction === 'asc' });

    if (error) throw error;
    return data;
  }

  async getById(id: string): Promise<NoteRow> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(noteData: NoteInsert): Promise<NoteRow> {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(noteData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, noteData: NoteUpdate): Promise<NoteRow> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(noteData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Дополнительные методы для бизнес-логики
  async searchByTitle(title: string): Promise<NoteRow[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .ilike('title', `%${title}%`);

    if (error) throw error;
    return data;
  }

  async getByCategory(categoryId: string): Promise<NoteRow[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('category_id', categoryId);

    if (error) throw error;
    return data;
  }

  async pinNote(id: string, isPinned: boolean): Promise<NoteRow> {
    return this.update(id, { is_pinned: isPinned });
  }

  async archiveNote(id: string, isArchived: boolean): Promise<NoteRow> {
    return this.update(id, { is_archived: isArchived });
  }
}