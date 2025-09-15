'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Calendar, Clock, AlertCircle, CheckCircle, File, Link, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface TodoData {
  id?: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  dueDate?: string;
  completedAt?: string;
  category: string;
  tags: string[];
  reminders: {
    id: string;
    date: string;
    time: string;
    notified: boolean;
  }[];
  subtasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
  attachments: {
    id: string;
    name: string;
    type: 'file' | 'link';
    url: string;
  }[];
  notes: string;
  estimatedTime?: string;
  actualTime?: string;
}

interface TodoProps {
  data: Partial<TodoData>;
  onChange: (data: Partial<TodoData>) => void;
  mode?: 'create' | 'edit' | 'view';
  onSave?: () => void;
}

export default function Todo({ data, onChange, mode = 'create', onSave }: TodoProps) {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    dates: true,
    category: true,
    subtasks: false,
    time: false,
    reminders: false,
    attachments: false,
    notes: false
  });
  const isViewMode = mode === 'view';

  useEffect(() => {
    if (mode === 'create' && !data.id) {
      updateField('id', generateId());
    }

    if (mode === 'create' && !data.createdAt) {
      updateField('createdAt', new Date().toISOString().split('T')[0]);
    }

    if (data.status === 'completed' && !data.completedAt) {
      updateField('completedAt', new Date().toISOString().split('T')[0]);
    } else if (data.status !== 'completed' && data.completedAt) {
      updateField('completedAt', undefined);
    }
  }, [data.status, mode]);

  const generateId = (): string => {
    return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const updateField = (field: keyof TodoData, value: any) => {
    const newData = {
      ...data,
      [field]: value
    };

    if (field === 'title' || field === 'dueDate') {
      validateField(field, value);
    }

    onChange(newData);
  };

  const validateField = (field: string, value: string) => {
    const errors: Record<string, string> = { ...validationErrors };

    if (field === 'title' && !value.trim()) {
      errors.title = 'Название задачи обязательно';
    } else if (field === 'title') {
      delete errors.title;
    }

    if (field === 'dueDate' && value) {
      const dueDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dueDate < today) {
        errors.dueDate = 'Дата выполнения не может быть в прошлом';
      } else {
        delete errors.dueDate;
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const addTag = () => {
    const newTags = [...(data.tags || []), ''];
    updateField('tags', newTags);
  };

  const removeTag = (index: number) => {
    const newTags = [...(data.tags || [])];
    newTags.splice(index, 1);
    updateField('tags', newTags);
  };

  const updateTag = (index: number, value: string) => {
    const newTags = [...(data.tags || [])];
    newTags[index] = value;
    updateField('tags', newTags);
  };

  const addReminder = () => {
    const newReminders = [...(data.reminders || []), {
      id: `rem_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      notified: false
    }];
    updateField('reminders', newReminders);
  };

  const removeReminder = (index: number) => {
    const newReminders = [...(data.reminders || [])];
    newReminders.splice(index, 1);
    updateField('reminders', newReminders);
  };

  const updateReminder = (index: number, field: string, value: string) => {
    const newReminders = [...(data.reminders || [])];
    newReminders[index] = { ...newReminders[index], [field]: value };
    updateField('reminders', newReminders);
  };

  const addSubtask = () => {
    const newSubtasks = [...(data.subtasks || []), {
      id: `sub_${Date.now()}`,
      title: '',
      completed: false
    }];
    updateField('subtasks', newSubtasks);
  };

  const removeSubtask = (index: number) => {
    const newSubtasks = [...(data.subtasks || [])];
    newSubtasks.splice(index, 1);
    updateField('subtasks', newSubtasks);
  };

  const updateSubtask = (index: number, field: string, value: any) => {
    const newSubtasks = [...(data.subtasks || [])];
    newSubtasks[index] = { ...newSubtasks[index], [field]: value };
    updateField('subtasks', newSubtasks);
  };

  const toggleSubtask = (index: number) => {
    const newSubtasks = [...(data.subtasks || [])];
    newSubtasks[index] = {
      ...newSubtasks[index],
      completed: !newSubtasks[index].completed
    };
    updateField('subtasks', newSubtasks);
  };

  const addAttachment = () => {
    const newAttachments = [...(data.attachments || []), {
      id: `att_${Date.now()}`,
      name: '',
      type: 'link',
      url: ''
    }];
    updateField('attachments', newAttachments);
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...(data.attachments || [])];
    newAttachments.splice(index, 1);
    updateField('attachments', newAttachments);
  };

  const updateAttachment = (index: number, field: string, value: any) => {
    const newAttachments = [...(data.attachments || [])];
    newAttachments[index] = { ...newAttachments[index], [field]: value };
    updateField('attachments', newAttachments);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'high': return 'bg-orange-500/20 text-orange-600 dark:text-orange-400';
      case 'urgent': return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default: return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error('Пожалуйста, заполните обязательные поля');
      return;
    }

    if (onSave) {
      onSave();
    }

    toast.success('Задача успешно сохранена!');
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!data.title?.trim()) {
      errors.title = 'Название задачи обязательно';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      {/* Basic Information */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">Основная информация</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection('basic')}
            className="h-6 px-2"
          >
            {expandedSections.basic ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        </div>

        {expandedSections.basic && (
          <div className="space-y-3 pl-2">
            <div>
              <Label htmlFor="title" className="text-xs">Название *</Label>
              <Input
                value={data.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Что нужно сделать?"
                disabled={isViewMode}
                className="h-8 text-sm"
              />
              {validationErrors.title && (
                <p className="text-destructive text-xs mt-1">{validationErrors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-xs">Описание</Label>
              <Textarea
                value={data.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Описание задачи..."
                rows={2}
                disabled={isViewMode}
                className="text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Приоритет</Label>
                <Select
                  value={data.priority || 'medium'}
                  onValueChange={(value: TodoData['priority']) => updateField('priority', value)}
                  disabled={isViewMode}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Приоритет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                    <SelectItem value="urgent">Срочный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Статус</Label>
                <Select
                  value={data.status || 'pending'}
                  onValueChange={(value: TodoData['status']) => updateField('status', value)}
                  disabled={isViewMode}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Ожидает</SelectItem>
                    <SelectItem value="in-progress">В процессе</SelectItem>
                    <SelectItem value="completed">Завершено</SelectItem>
                    <SelectItem value="cancelled">Отменено</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">Даты</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection('dates')}
            className="h-6 px-2"
          >
            {expandedSections.dates ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        </div>

        {expandedSections.dates && (
          <div className="grid grid-cols-2 gap-3 pl-2">
            <div>
              <Label className="text-xs">Создана</Label>
              <Input
                type="date"
                value={data.createdAt || ''}
                disabled={true}
                className="h-8 text-sm"
              />
            </div>

            <div>
              <Label className="text-xs">Срок выполнения</Label>
              <Input
                type="date"
                value={data.dueDate || ''}
                onChange={(e) => updateField('dueDate', e.target.value)}
                disabled={isViewMode}
                className="h-8 text-sm"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        )}
      </div>

      {/* Category & Tags */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">Категория и теги</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection('category')}
            className="h-6 px-2"
          >
            {expandedSections.category ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        </div>

        {expandedSections.category && (
          <div className="space-y-3 pl-2">
            <div>
              <Label className="text-xs">Категория</Label>
              <Input
                value={data.category || ''}
                onChange={(e) => updateField('category', e.target.value)}
                placeholder="Категория"
                disabled={isViewMode}
                className="h-8 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label className="text-xs">Теги</Label>
                {!isViewMode && (
                  <Button type="button" variant="ghost" size="sm" onClick={addTag} className="h-6 px-2">
                    <Plus className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {data.tags?.map((tag, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={tag}
                      onChange={(e) => updateTag(index, e.target.value)}
                      placeholder="Тег"
                      disabled={isViewMode}
                      className="h-7 text-sm"
                    />
                    {!isViewMode && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTag(index)}
                        className="h-7 w-7"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtasks - Collapsible */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">Подзадачи</Label>
          <div className="flex items-center gap-2">
            {!isViewMode && (
              <Button type="button" variant="ghost" size="sm" onClick={addSubtask} className="h-6 px-2">
                <Plus className="h-3 w-3" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('subtasks')}
              className="h-6 px-2"
            >
              {expandedSections.subtasks ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          </div>
        </div>

        {expandedSections.subtasks && data.subtasks && data.subtasks.length > 0 && (
          <div className="space-y-2 pl-2">
            {data.subtasks.map((subtask, index) => (
              <div key={subtask.id} className="flex items-center gap-2 p-2 border rounded-md">
                <Switch
                  checked={subtask.completed}
                  onCheckedChange={() => toggleSubtask(index)}
                  disabled={isViewMode}
                  className="h-4 w-7"
                />
                <Input
                  value={subtask.title}
                  onChange={(e) => updateSubtask(index, 'title', e.target.value)}
                  placeholder="Подзадача"
                  disabled={isViewMode}
                  className={cn("h-7 text-sm flex-1", subtask.completed && "line-through text-muted-foreground")}
                />
                {!isViewMode && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSubtask(index)}
                    className="h-7 w-7"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Time Estimates - Collapsible */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">Время</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection('time')}
            className="h-6 px-2"
          >
            {expandedSections.time ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        </div>

        {expandedSections.time && (
          <div className="grid grid-cols-2 gap-3 pl-2">
            <div>
              <Label className="text-xs">Планируемое (ч)</Label>
              <Input
                type="number"
                min="0"
                step="0.5"
                value={data.estimatedTime || ''}
                onChange={(e) => updateField('estimatedTime', e.target.value)}
                placeholder="0.0"
                disabled={isViewMode}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Фактическое (ч)</Label>
              <Input
                type="number"
                min="0"
                step="0.5"
                value={data.actualTime || ''}
                onChange={(e) => updateField('actualTime', e.target.value)}
                placeholder="0.0"
                disabled={isViewMode}
                className="h-8 text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Notes - Collapsible */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">Заметки</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection('notes')}
            className="h-6 px-2"
          >
            {expandedSections.notes ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        </div>

        {expandedSections.notes && (
          <div className="pl-2">
            <Textarea
              value={data.notes || ''}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Дополнительные заметки..."
              rows={2}
              disabled={isViewMode}
              className="text-sm resize-none"
            />
          </div>
        )}
      </div>

      {/* Save Button */}
      {!isViewMode && (
        <div className="pt-2">
          <Button onClick={handleSave} className="w-full" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Сохранить задачу
          </Button>
        </div>
      )}
    </div>
  );
}
