'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface TemplateField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface TemplateData {
  name: string;
  description: string;
  noteType: string;
  category: string;
  fields: TemplateField[];
}

export interface CreateTemplateNoteParams {
  title: string;
  content: string;
  note_type: string;
  category_id?: string;
  is_template: boolean;
  templates_data: TemplateData;
  tags?: string[];
  is_public?: boolean;
}

export async function createTemplateNote(params: CreateTemplateNoteParams) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Prepare the note data - используем templates_data для хранения шаблона
    const noteData = {
      title: params.title,
      content: params.content,
      author_id: user.id,
      type: 'template' as const, // Используем тип 'template'
      category_id: params.category_id || null,
      templates_data: params.templates_data, // Сохраняем структуру шаблона
      metadata: {
        is_template: true, // Дублируем в metadata для удобства фильтрации
        template_name: params.templates_data.name,
        template_type: params.templates_data.noteType
      }
    };

    // Insert the template note
    const { data, error } = await supabase
      .from('notes')
      .insert([noteData])
      .select()
      .single();

    if (error) {
      console.error('Error creating template note:', error);
      throw new Error(`Failed to create template: ${error.message}`);
    }

    revalidatePath('/dashboard/notes/templates');
    return { success: true, data };
  } catch (error) {
    console.error('Error in createTemplateNote:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function getNoteCategories() {
  try {
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('note_categories')
      .select('id, name')
      .order('name');
    
    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error in getNoteCategories:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function getTemplateNotes() {
  try {
    const supabase = await createSupabaseServerClient();

    // Ищем записи с type = 'template' ИЛИ с templates_data != null
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .or('type.eq.template,templates_data.not.is.null')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch templates: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in getTemplateNotes:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function getTemplateNoteById(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .or('type.eq.template,templates_data.not.is.null')
      .single();

    if (error) {
      throw new Error(`Failed to fetch template: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in getTemplateNoteById:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function updateTemplateNote(id: string, params: Partial<CreateTemplateNoteParams>) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Prepare update data
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (params.title !== undefined) updateData.title = params.title;
    if (params.content !== undefined) updateData.content = params.content;
    if (params.note_type !== undefined) updateData.note_type = params.note_type;
    if (params.category_id !== undefined) updateData.category_id = params.category_id;
    if (params.templates_data !== undefined) updateData.templates_data = params.templates_data;
    if (params.tags !== undefined) updateData.tags = params.tags;
    if (params.is_public !== undefined) updateData.is_public = params.is_public;

    // Update the template note
    const { data, error } = await supabase
      .from('notes')
      .update(updateData)
      .eq('id', id)
      .eq('author_id', user.id) // Ensure user owns the template
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update template: ${error.message}`);
    }

    revalidatePath('/templates');
    revalidatePath(`/templates/${id}`);
    return { success: true, data };
  } catch (error) {
    console.error('Error in updateTemplateNote:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function deleteTemplateNote(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Delete the template note
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('author_id', user.id) // Ensure user owns the template
      .eq('is_template', true);

    if (error) {
      throw new Error(`Failed to delete template: ${error.message}`);
    }

    revalidatePath('/templates');
    return { success: true };
  } catch (error) {
    console.error('Error in deleteTemplateNote:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function createNoteFromTemplate(templateId: string, values: Record<string, any>) {
  try {
    const supabase = await createSupabaseServerClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Get the template
    const { data: template, error: templateError } = await supabase
      .from('notes')
      .select('*')
      .eq('id', templateId)
      .eq('is_template', true)
      .single();

    if (templateError || !template) {
      throw new Error('Template not found');
    }

    // Prepare the note content based on template fields and values
    let content = '';
    if (template.templates_data && typeof template.templates_data === 'object') {
      const templateData = template.templates_data as TemplateData;

      content = `# ${template.title}\n\n`;

      templateData.fields.forEach(field => {
        const value = values[field.id] || '';
        content += `## ${field.label}\n${value}\n\n`;
      });
    } else {
      // Fallback if templates_data is not properly structured
      content = template.content;
    }

    // Create the new note
    const noteData = {
      title: template.title,
      content: content,
      author_id: user.id,
      note_type: template.note_type,
      category_id: template.category_id,
      is_template: false,
      templates_data: template.templates_data,
      tags: template.tags,
      is_public: template.is_public,
      metadata: {
        created_from_template: templateId,
        template_name: template.title
      }
    };

    const { data, error } = await supabase
      .from('notes')
      .insert([noteData])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create note from template: ${error.message}`);
    }

    revalidatePath('/dashboard/notes');
    return { success: true, data };
  } catch (error) {
    console.error('Error in createNoteFromTemplate:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
