// components/NoteEditor.tsx
'use client';

import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TemplateLoader from './templates/TemplateLoader';
import TemplateSelectorGrid from './templates/TemplateSelectorGrid';
import { TemplateType, getDefaultData } from './templates/registry';
import { ArrowLeft, Plus, Save } from 'lucide-react';

export default function NoteEditor() {
    const [activeStep, setActiveStep] = useState<'select' | 'create'>('select');
    const [templateType, setTemplateType] = useState<TemplateType | null>(null);
    const [templateData, setTemplateData] = useState<any>(null);
    const [noteTitle, setNoteTitle] = useState('');
    const [errors, setErrors] = useState<{ title?: string }>({});

    const handleTemplateSelect = (newType: TemplateType) => {
        setTemplateType(newType);
        setTemplateData(getDefaultData(newType));
        setActiveStep('create');
    };

    const handleDataChange = (newData: any) => {
        setTemplateData(newData);
    };

    const validateForm = () => {
        const newErrors: { title?: string } = {};

        if (!noteTitle.trim()) {
            newErrors.title = 'Document title is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        const completeData = {
            title: noteTitle,
            type: templateType,
            ...templateData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        console.log('Saving data:', completeData);
        // Implement your save logic here
    };

    const handleBack = () => {
        setActiveStep('select');
        setTemplateType(null);
        setTemplateData(null);
        setErrors({});
    };

    const handleNewNote = () => {
        setNoteTitle('');
        setActiveStep('select');
        setTemplateType(null);
        setTemplateData(null);
        setErrors({});
    };

    if (activeStep === 'select') {
        return (
            <div className='mx-auto max-w-4xl space-y-8 p-6'>
                <div className='space-y-2 text-center'>
                    <h1 className='text-3xl font-bold text-foreground'>Create New Document</h1>
                    <p className='text-muted-foreground'>
                        First select a document type, then you'll be able to add details
                    </p>
                </div>

                <TemplateSelectorGrid onTemplateSelect={handleTemplateSelect} />
            </div>
        );
    }

    return (
        <div className='mx-auto max-w-4xl space-y-6 p-6'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Button variant='outline' onClick={handleBack} size='sm'>
                        <ArrowLeft className='mr-1 h-4 w-4' />
                        Change Type
                    </Button>
                    <h1 className='text-2xl font-bold text-foreground'>Create Document</h1>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant='outline' onClick={handleNewNote} size='sm'>
                        <Plus className='mr-1 h-4 w-4' />
                        New
                    </Button>
                    <Button onClick={handleSave}>
                        <Save className='mr-1 h-4 w-4' />
                        Save
                    </Button>
                </div>
            </div>

            <div className='space-y-4'>
                <div>
                    <Label htmlFor='document-title' className='text-foreground'>
                        Document Title *
                    </Label>
                    <Input
                        id='document-title'
                        value={noteTitle}
                        onChange={(e) => {
                            setNoteTitle(e.target.value);
                            if (errors.title) setErrors({});
                        }}
                        placeholder='Enter document title'
                        className='text-lg font-medium text-foreground bg-background border-border'
                        aria-invalid={!!errors.title}
                    />
                    {errors.title && <p className='mt-1 text-sm text-destructive'>{errors.title}</p>}
                </div>

                <Alert className='bg-muted/30 border-border'>
                    <AlertDescription className='flex items-center gap-2 text-foreground'>
                        <span className='font-medium'>Document Type:</span>
                        {templateType}
                    </AlertDescription>
                </Alert>
            </div>

            <div className='bg-card rounded-lg border border-border p-4'>
                <TemplateLoader
                    templateType={templateType!}
                    data={templateData}
                    onChange={handleDataChange}
                    mode='create'
                />
            </div>
        </div>
    );
}
