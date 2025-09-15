'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, GripVertical, Save, ArrowLeft } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { toast } from 'sonner';
import { getNoteTypeById, createNoteType, updateNoteType } from '@/actions/notes/noteTypes'; // Adjust import path as needed

interface Field {
  id: string;
  label: string;
  type: string;
  required?: boolean;
}

interface NoteTypeEditorProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default function NoteTypeEditor({ params }: NoteTypeEditorProps) {
  const { id } = React.use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(id !== 'new');
  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<Field[]>([]);

  // Field type options
  const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'date', label: 'Date' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'select', label: 'Dropdown' },
  ];

  // Load existing note type (only if editing)
  useEffect(() => {
    async function fetchNoteType() {
      try {
        setIsLoading(true);

        // Use server action instead of fetch
        const data = await getNoteTypeById(id);

        if (data) {
          setName(data.name);
          setDescription(data.description || '');
          setFields(data.fields || []);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (id !== 'new') {
          toast.error('Failed to load note type');
        }
      } finally {
        setIsLoading(false);
      }
    }

    // Only fetch if we're editing an existing note type
    if (id !== 'new') {
      fetchNoteType();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  // Add field
  const addField = () => {
    setFields(prev => [
      ...prev,
      { id: crypto.randomUUID(), label: 'New Field', type: 'text', required: false },
    ]);
  };

  // Remove field
  const removeField = (fieldId: string) => {
    setFields(prev => prev.filter(f => f.id !== fieldId));
  };

  // Update field
  const updateField = (fieldId: string, key: keyof Field, value: string | boolean) => {
    setFields(prev =>
      prev.map(f => (f.id === fieldId ? { ...f, [key]: value } : f))
    );
  };

  // Drag and drop
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const newFields = Array.from(fields);
    const [moved] = newFields.splice(sourceIndex, 1);
    newFields.splice(destinationIndex, 0, moved);
    setFields(newFields);
  };

  // Save note type using server actions
  const saveNoteType = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name for your note type');
      return;
    }

    if (fields.length === 0) {
      toast.error('Please add at least one field');
      return;
    }

    try {
      setIsSaving(true);

      if (id === 'new') {
        // Create new note type
        await createNoteType({ name, description, fields });
        toast.success('Note type created successfully!');
        router.push('/note-types');
        router.refresh();
      } else {
        // Update existing note type
        await updateNoteType(id, { name, description, fields });
        toast.success('Note type updated successfully!');
      }
    } catch (err: any) {
      console.error('Save error:', err);
      toast.error(err.message || 'Failed to save note type');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-foreground">
          {id === 'new' ? 'Create Note Type' : 'Edit Note Type'}
        </h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name *
              </label>
              <Input
                id="name"
                placeholder="e.g., Patient Visit, Project Update"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="description"
                placeholder="Describe what this note type is for"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Fields *</h3>
                <Button onClick={addField} variant="outline" size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Field
                </Button>
              </div>

              {fields.length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <p className="text-muted-foreground">No fields added yet</p>
                  <Button onClick={addField} variant="link" className="mt-2">
                    Add your first field
                  </Button>
                </div>
              ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="fields-droppable">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                      >
                        {fields.map((field, index) => (
                          <Draggable key={field.id} draggableId={field.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`p-4 border rounded-lg bg-card transition-colors ${
                                  snapshot.isDragging ? 'shadow-lg border-blue-400 rotate-2' : 'border-border'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="mt-2.5 p-1 rounded hover:bg-accent cursor-grab"
                                  >
                                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                                  </div>

                                  <div className="grid gap-3 flex-1">
                                    <div className="flex gap-3 flex-col sm:flex-row">
                                      <div className="flex-1">
                                        <label className="text-sm font-medium mb-1 block">Label</label>
                                        <Input
                                          value={field.label}
                                          onChange={(e) => updateField(field.id, 'label', e.target.value)}
                                          placeholder="Field label"
                                        />
                                      </div>

                                      <div className="w-full sm:w-40">
                                        <label className="text-sm font-medium mb-1 block">Type</label>
                                        <Select
                                          value={field.type}
                                          onValueChange={(value) => updateField(field.id, 'type', value)}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {fieldTypes.map((type) => (
                                              <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={field.required || false}
                                          onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                                          className="rounded border-gray-300"
                                        />
                                        <span className="text-sm">Required field</span>
                                      </label>

                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeField(field.id)}
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                      >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button
                onClick={saveNoteType}
                disabled={isSaving || !name.trim() || fields.length === 0}
                className="min-w-32"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Note Type
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
