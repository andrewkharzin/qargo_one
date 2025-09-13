'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { toast } from 'sonner';

interface Field {
  id: string;
  label: string;
  type: string; // text, number, textarea, date, etc.
}

interface NoteTypeEditorProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default function NoteTypeEditor({ params }: NoteTypeEditorProps) {
  const { id } = React.use(params); // unwrap promise
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<Field[]>([]);

  // Load existing note type
  useEffect(() => {
    async function fetchNoteType() {
      try {
        const res = await fetch(`/api/note-types/${id}`);
        const data = await res.json();
        setName(data.name);
        setDescription(data.description);
        setFields(data.fields || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load note type');
      }
    }
    fetchNoteType();
  }, [id]);

  // Add field
  const addField = () => {
    setFields(prev => [
      ...prev,
      { id: crypto.randomUUID(), label: 'New Field', type: 'text' },
    ]);
  };

  // Remove field
  const removeField = (fieldId: string) => {
    setFields(prev => prev.filter(f => f.id !== fieldId));
  };

  // Update field
  const updateField = (fieldId: string, key: 'label' | 'type', value: string) => {
    setFields(prev =>
      prev.map(f => (f.id === fieldId ? { ...f, [key]: value } : f))
    );
  };

  // Drag and drop
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newFields = Array.from(fields);
    const [moved] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, moved);
    setFields(newFields);
  };

  // Save note type
  const saveNoteType = async () => {
    try {
      await fetch(`/api/note-types/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description, fields }),
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Note type saved!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save note type');
    }
  };

  return (
    <div className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-100">
          Edit Note Type
        </h2>
        <Button onClick={saveNoteType} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          Save
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-100 mb-2">
          Fields
        </h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 p-2 rounded"
                      >
                        <Input
                          value={field.label}
                          onChange={(e) => updateField(field.id, 'label', e.target.value)}
                          className="flex-1"
                        />
                        <select
                          value={field.type}
                          onChange={(e) => updateField(field.id, 'type', e.target.value)}
                          className="border rounded p-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="textarea">Textarea</option>
                          <option value="date">Date</option>
                        </select>
                        <Button variant="destructive" size="sm" onClick={() => removeField(field.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button onClick={addField} className="mt-2" variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>
    </div>
  );
}
