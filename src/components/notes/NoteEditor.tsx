'use client';

import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category, Note } from '@/types/notes';

import { motion } from 'framer-motion';
import {
    AlertTriangle,
    ArrowLeft,
    Award,
    Bell,
    BookOpen,
    Bug,
    Building,
    Calendar,
    CheckCircle,
    CheckSquare,
    Clock,
    Database,
    Eye,
    EyeOff,
    FileCheck,
    FileText,
    GraduationCap,
    Layout as LayoutIcon,
    Lightbulb,
    ListTodo,
    Loader2,
    LucideIcon,
    Mail,
    MessageSquare,
    Phone,
    Plane,
    Save,
    Scale,
    Search,
    Settings,
    Shield,
    Siren,
    Tag,
    ThumbsDown,
    Users,
    Workflow,
    X
} from 'lucide-react';

// Динамический импорт ReactQuill только на клиентской стороне
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <div className='h-32 animate-pulse rounded-lg bg-gray-100'></div>
});

// Replace the TiptapEditor import with a dynamic import
const TiptapEditor = dynamic(() => import('@/components/notes/editors/TiptapEditor'), {
    ssr: false,
    loading: () => <div className='h-32 animate-pulse rounded-lg bg-gray-100'></div>
});

interface ProcedureStep {
    step: string;
    completed: boolean;
}

interface TodoItem {
    task: string;
    completed: boolean;
    priority: string;
}

interface TemplateField {
    field_name: string;
    field_type: string;
    options: string[];
    required: boolean;
}

interface NoteEditorProps {
    note?: Note;
    categories: Category[];
    onSave: (note: { title: string; content: string; category: string; color: string }) => void;
    onCancel: () => void;
    isSaving?: boolean;
}

interface ColorOption {
    value: string;
    label: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
}

interface DocumentTypeOption {
    value: string;
    label: string;
    icon: LucideIcon;
    category: string;
    description: string;
}

const colorOptions: ColorOption[] = [
    {
        value: 'slate',
        label: 'Slate',
        bgClass: 'bg-slate-100',
        textClass: 'text-slate-800',
        borderClass: 'border-slate-300'
    },
    {
        value: 'gray',
        label: 'Gray',
        bgClass: 'bg-gray-100',
        textClass: 'text-gray-800',
        borderClass: 'border-gray-300'
    },
    {
        value: 'zinc',
        label: 'Zinc',
        bgClass: 'bg-zinc-100',
        textClass: 'text-zinc-800',
        borderClass: 'border-zinc-300'
    },
    {
        value: 'neutral',
        label: 'Neutral',
        bgClass: 'bg-neutral-100',
        textClass: 'text-neutral-800',
        borderClass: 'border-neutral-300'
    },
    {
        value: 'stone',
        label: 'Stone',
        bgClass: 'bg-stone-100',
        textClass: 'text-stone-800',
        borderClass: 'border-stone-300'
    },
    { value: 'red', label: 'Red', bgClass: 'bg-red-100', textClass: 'text-red-800', borderClass: 'border-red-300' },
    {
        value: 'orange',
        label: 'Orange',
        bgClass: 'bg-orange-100',
        textClass: 'text-orange-800',
        borderClass: 'border-orange-300'
    },
    {
        value: 'amber',
        label: 'Amber',
        bgClass: 'bg-amber-100',
        textClass: 'text-amber-800',
        borderClass: 'border-amber-300'
    },
    {
        value: 'yellow',
        label: 'Yellow',
        bgClass: 'bg-yellow-100',
        textClass: 'text-yellow-800',
        borderClass: 'border-yellow-300'
    },
    { value: 'lime', label: 'Lime', bgClass: 'bg-lime-100', textClass: 'text-lime-800', borderClass: 'border-lime-300' }
];

// Updated constant with comprehensive types and descriptions
const documentTypeOptions: DocumentTypeOption[] = [
    {
        value: 'note',
        label: 'Note',
        icon: FileText,
        category: 'General',
        description: 'General purpose note for any information'
    },
    {
        value: 'quick_note',
        label: 'Quick Note',
        icon: FileText,
        category: 'General',
        description: 'Brief note for quick capture'
    },
    {
        value: 'bookmark',
        label: 'Bookmark',
        icon: FileText,
        category: 'General',
        description: 'Save and organize important links'
    },
    {
        value: 'procedure',
        label: 'Procedure',
        icon: CheckSquare,
        category: 'Process',
        description: 'Step-by-step instructions for a process'
    },
    {
        value: 'checklist',
        label: 'Checklist',
        icon: ListTodo,
        category: 'Process',
        description: 'Task list with completion tracking'
    },
    {
        value: 'template',
        label: 'Template',
        icon: LayoutIcon,
        category: 'Process',
        description: 'Reusable document structure'
    },
    {
        value: 'sop',
        label: 'SOP',
        icon: Settings,
        category: 'Process',
        description: 'Standard Operating Procedure document'
    },
    {
        value: 'workflow',
        label: 'Workflow',
        icon: Workflow,
        category: 'Process',
        description: 'Process flow with multiple steps'
    },
    {
        value: 'problem',
        label: 'Problem',
        icon: AlertTriangle,
        category: 'Issues',
        description: 'Documentation of an identified issue'
    },
    {
        value: 'incident',
        label: 'Incident',
        icon: Bug,
        category: 'Issues',
        description: 'Record of an unexpected event or outage'
    },
    {
        value: 'solution',
        label: 'Solution',
        icon: Lightbulb,
        category: 'Issues',
        description: 'Resolution to a problem or issue'
    },
    {
        value: 'workaround',
        label: 'Workaround',
        icon: Settings,
        category: 'Issues',
        description: 'Temporary fix for an ongoing problem'
    },
    { value: 'risk', label: 'Risk', icon: Shield, category: 'Issues', description: 'Potential issue that might occur' },
    {
        value: 'client_request',
        label: 'Client Request',
        icon: Users,
        category: 'Client',
        description: 'Formal request from a client'
    },
    {
        value: 'client_feedback',
        label: 'Client Feedback',
        icon: MessageSquare,
        category: 'Client',
        description: 'Feedback received from clients'
    },
    {
        value: 'complaint',
        label: 'Complaint',
        icon: ThumbsDown,
        category: 'Client',
        description: 'Formal complaint from a client'
    },
    {
        value: 'approval',
        label: 'Approval',
        icon: CheckCircle,
        category: 'Client',
        description: 'Document requiring client approval'
    },
    {
        value: 'email',
        label: 'Email',
        icon: Mail,
        category: 'Communication',
        description: 'Record of important email correspondence'
    },
    {
        value: 'message',
        label: 'Message',
        icon: MessageSquare,
        category: 'Communication',
        description: 'Important chat or message record'
    },
    {
        value: 'meeting_notes',
        label: 'Meeting Notes',
        icon: Calendar,
        category: 'Communication',
        description: 'Notes from meetings or discussions'
    },
    {
        value: 'call_summary',
        label: 'Call Summary',
        icon: Phone,
        category: 'Communication',
        description: 'Summary of important phone calls'
    },
    {
        value: 'knowledge_base',
        label: 'Knowledge Base',
        icon: BookOpen,
        category: 'Knowledge',
        description: 'Information for reference and training'
    },
    {
        value: 'training',
        label: 'Training',
        icon: GraduationCap,
        category: 'Knowledge',
        description: 'Training materials and guides'
    },
    {
        value: 'best_practice',
        label: 'Best Practice',
        icon: Award,
        category: 'Knowledge',
        description: 'Recommended approaches and methods'
    },
    {
        value: 'lesson_learned',
        label: 'Lesson Learned',
        icon: Lightbulb,
        category: 'Knowledge',
        description: 'Insights gained from experience'
    },
    {
        value: 'reminder',
        label: 'Reminder',
        icon: Clock,
        category: 'System',
        description: 'Note to remember important tasks or events'
    },
    {
        value: 'alert',
        label: 'Alert',
        icon: Bell,
        category: 'System',
        description: 'Important notification or warning'
    },
    {
        value: 'auto_generated',
        label: 'Auto Generated',
        icon: Database,
        category: 'System',
        description: 'Automatically created note or report'
    },
    {
        value: 'system_log',
        label: 'System Log',
        icon: FileText,
        category: 'System',
        description: 'Record of system events or changes'
    },
    {
        value: 'booking_notes',
        label: 'Booking Notes',
        icon: Calendar,
        category: 'Travel',
        description: 'Details about travel bookings'
    },
    {
        value: 'flight_notes',
        label: 'Flight Notes',
        icon: Plane,
        category: 'Travel',
        description: 'Information about flights'
    },
    {
        value: 'airline_notes',
        label: 'Airline Notes',
        icon: Plane,
        category: 'Travel',
        description: 'Notes about airlines and services'
    },
    {
        value: 'airport_notes',
        label: 'Airport Notes',
        icon: Building,
        category: 'Travel',
        description: 'Information about airports'
    },
    {
        value: 'emergency',
        label: 'Emergency',
        icon: Siren,
        category: 'Critical',
        description: 'Emergency procedures and contacts'
    },
    {
        value: 'legal',
        label: 'Legal',
        icon: Scale,
        category: 'Critical',
        description: 'Legal documents and requirements'
    },
    {
        value: 'compliance',
        label: 'Compliance',
        icon: FileCheck,
        category: 'Critical',
        description: 'Compliance-related documentation'
    },
    { value: 'audit', label: 'Audit', icon: Search, category: 'Critical', description: 'Audit records and findings' },
    {
        value: 'task',
        label: 'Task',
        icon: CheckSquare,
        category: 'Critical',
        description: 'Individual task or assignment'
    }
];

// Helper to group document types by category for the Select component
const documentTypesByCategory = documentTypeOptions.reduce((acc: Record<string, DocumentTypeOption[]>, option) => {
    if (!acc[option.category]) {
        acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
}, {});

export default function NoteEditor({ note, categories, onSave, onCancel, isSaving }: NoteEditorProps) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category_id: '',
        color: 'slate',
        tags: [] as string[],
        is_pinned: false,
        is_public: false,
        type: 'note',
        priority: 3,
        urgency: 3
    });
    const [newTag, setNewTag] = useState('');
    const [debugLogs, setDebugLogs] = useState<string[]>([]);

    // Get the selected color class
    const selectedColor = colorOptions.find((option) => option.value === formData.color) || colorOptions[0];

    // Apply color to the editor container
    const editorContainerClass = `overflow-hidden rounded-2xl border ${selectedColor.borderClass} ${selectedColor.bgClass} shadow-xl backdrop-blur-sm`;

    // Debug logging function
    const addDebugLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        const logMessage = `${timestamp}: ${message}`;
        console.log('📝 NoteEditor:', logMessage);
        setDebugLogs((prev) => [...prev, logMessage]);
    };

    useEffect(() => {
        addDebugLog('Component mounted');
        if (note) {
            addDebugLog(`Editing existing note: ${note.title}`);
            setFormData({
                title: note.title || '',
                content: note.content || '',
                category_id: note.category_id || '',
                color: note.color || 'slate',
                tags: note.tags || [],
                is_pinned: note.is_pinned || false,
                is_public: note.is_public || false,
                type: note.type || 'note',
                priority: note.priority || 3,
                urgency: note.urgency || 3
            });
        } else {
            addDebugLog('Creating new note');
        }
    }, [note]);

    const stripHtml = (html: string): string => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const countWords = (content: string): number => {
        const text = stripHtml(content);
        return text
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0).length;
    };

    const handleAddTag = () => {
        addDebugLog(`Adding tag: ${newTag}`);
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        addDebugLog(`Removing tag: ${tagToRemove}`);
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove)
        }));
    };

    const handleSave = async () => {
        addDebugLog('💾 Save button clicked');
        addDebugLog(
            `Form data - Title: "${formData.title}", Content length: ${formData.content.length}, Category: ${formData.category_id}`
        );

        if (!formData.title.trim()) {
            addDebugLog('❌ Title validation failed');
            alert('Please enter a title for your note');
            return;
        }

        addDebugLog('✅ Validation passed, calling onSave');
        try {
            addDebugLog('📤 Calling parent onSave function...');
            await onSave({
                title: formData.title,
                content: formData.content,
                category: formData.category_id,
                color: formData.color // Add this
            });
            addDebugLog('✅ onSave completed successfully');
        } catch (error) {
            addDebugLog(`❌ Error in onSave: ${error}`);
            console.error('Error saving note:', error);
            alert('Failed to save note. Please try again.');
        }
    };

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: [] }, { background: [] }],
            ['link'],
            ['clean']
        ]
    };

    // Test button to check if basic interactions work
    const testInteraction = () => {
        addDebugLog('🧪 Test button clicked - basic interaction works!');
        alert('Test button works! Check console for debug logs.');
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20'>
            <div className='mx-auto max-w-4xl p-4 lg:p-8'>
                {/* Debug Panel */}
                <div className='mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                    <h3 className='mb-2 font-bold text-yellow-800'>Debug Information</h3>
                    <div className='max-h-32 space-y-1 overflow-y-auto text-xs text-yellow-700'>
                        {debugLogs.map((log, index) => (
                            <div key={index}>{log}</div>
                        ))}
                    </div>
                    <button
                        onClick={testInteraction}
                        className='mt-2 rounded bg-yellow-500 px-3 py-1 text-xs text-white'>
                        Test Interaction
                    </button>
                </div>

                {/* Header */}
                <div className='mb-6 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <Button variant='outline' size='icon' onClick={onCancel} className='hover:bg-slate-100'>
                            <ArrowLeft className='h-4 w-4' />
                        </Button>
                        <div>
                            <h1 className='text-2xl font-bold text-slate-900'>
                                {note ? 'Edit Note' : 'Create New Note'}
                            </h1>
                            <p className='text-slate-600'>Create and edit your notes</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3'>
                        <Button
                            onClick={handleSave}
                            disabled={isSaving || !formData.title.trim()}
                            className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'>
                            {isSaving ? (
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            ) : (
                                <Save className='mr-2 h-4 w-4' />
                            )}
                            {isSaving ? 'Saving...' : 'Save Note'}
                        </Button>
                    </div>
                </div>

                {/* Editor Form */}
                {/* Editor Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`overflow-hidden rounded-2xl border ${selectedColor.borderClass} ${selectedColor.bgClass} shadow-xl backdrop-blur-sm`}>
                    {/* Title and Meta Section with applied color */}
                    <div className={`border-b ${selectedColor.borderClass} p-6`}>
                        <div className='mb-4 grid gap-4 lg:grid-cols-2'>
                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Note Title *</label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => {
                                        addDebugLog(`Title changed to: ${e.target.value}`);
                                        setFormData((prev) => ({ ...prev, title: e.target.value }));
                                    }}
                                    placeholder='Enter your note title...'
                                    className='border-slate-200 text-lg font-medium focus:border-blue-500 focus:ring-blue-500'
                                    required
                                />
                            </div>
                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Document Type</label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => {
                                        addDebugLog(`Document type changed to: ${value}`);
                                        setFormData((prev) => ({ ...prev, type: value }));
                                    }}>
                                    <SelectTrigger className='border-slate-200 focus:border-blue-500 focus:ring-blue-500'>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className='max-h-96 overflow-y-auto'>
                                        {Object.entries(documentTypesByCategory).map(([category, types]) => (
                                            <div key={category}>
                                                <div className='px-2 py-1 text-xs font-semibold tracking-wider text-slate-500 uppercase'>
                                                    {category}
                                                </div>
                                                {types.map((type) => (
                                                    <SelectItem key={type.value} value={type.value}>
                                                        <div className='flex flex-col'>
                                                            <div className='flex items-center gap-2'>
                                                                <type.icon className='h-4 w-4' />
                                                                <span className='font-medium'>{type.label}</span>
                                                            </div>
                                                            <div className='mt-1 ml-6 text-xs text-slate-500'>
                                                                {type.description}
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </div>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className='grid gap-4 lg:grid-cols-4'>
                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Category</label>
                                <Select
                                    value={formData.category_id}
                                    onValueChange={(value) => {
                                        addDebugLog(`Category changed to: ${value}`);
                                        setFormData((prev) => ({ ...prev, category_id: value }));
                                    }}>
                                    <SelectTrigger className='border-slate-200 focus:border-blue-500 focus:ring-blue-500'>
                                        <SelectValue placeholder='Select category...' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Color Theme</label>
                                <Select
                                    value={formData.color}
                                    onValueChange={(value) => {
                                        addDebugLog(`Color changed to: ${value}`);
                                        setFormData((prev) => ({ ...prev, color: value }));
                                    }}>
                                    <SelectTrigger className='border-slate-200 focus:border-blue-500 focus:ring-blue-500'>
                                        <SelectValue placeholder='Select color theme...' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {colorOptions.map((color) => (
                                            <SelectItem key={color.value} value={color.value}>
                                                <div className='flex items-center gap-2'>
                                                    <div
                                                        className={`h-4 w-4 rounded-full ${color.bgClass} ${color.borderClass} border`}></div>
                                                    {color.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Priority (1-5)</label>
                                <Select
                                    value={formData.priority.toString()}
                                    onValueChange={(value) => {
                                        addDebugLog(`Priority changed to: ${value}`);
                                        setFormData((prev) => ({ ...prev, priority: parseInt(value) }));
                                    }}>
                                    <SelectTrigger className='border-slate-200 focus:border-blue-500 focus:ring-blue-500'>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='1'>1 - Lowest</SelectItem>
                                        <SelectItem value='2'>2 - Low</SelectItem>
                                        <SelectItem value='3'>3 - Medium</SelectItem>
                                        <SelectItem value='4'>4 - High</SelectItem>
                                        <SelectItem value='5'>5 - Highest</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className='mb-2 block text-sm font-medium text-slate-700'>Urgency (1-5)</label>
                                <Select
                                    value={formData.urgency.toString()}
                                    onValueChange={(value) => {
                                        addDebugLog(`Urgency changed to: ${value}`);
                                        setFormData((prev) => ({ ...prev, urgency: parseInt(value) }));
                                    }}>
                                    <SelectTrigger className='border-slate-200 focus:border-blue-500 focus:ring-blue-500'>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='1'>1 - Low</SelectItem>
                                        <SelectItem value='2'>2 - Medium</SelectItem>
                                        <SelectItem value='3'>3 - High</SelectItem>
                                        <SelectItem value='4'>4 - Urgent</SelectItem>
                                        <SelectItem value='5'>5 - Critical</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className='mt-4 flex items-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <Checkbox
                                    id='is_pinned'
                                    checked={formData.is_pinned}
                                    onCheckedChange={(checked) => {
                                        addDebugLog(`Pinned changed to: ${checked}`);
                                        setFormData((prev) => ({ ...prev, is_pinned: !!checked }));
                                    }}
                                />
                                <label htmlFor='is_pinned' className='text-sm font-medium text-slate-700'>
                                    Pin this note
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div className='p-6'>
                        <label className='mb-3 block text-sm font-medium text-slate-700'>Content *</label>
                        <div className='mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white'>
                            <TiptapEditor
                                content={formData.content}
                                onChange={(content) => {
                                    addDebugLog(`Content changed, length: ${content.length}`);
                                    setFormData((prev) => ({ ...prev, content }));
                                }}
                                placeholder='Start writing your note content...'
                            />
                        </div>
                    </div>

                    {/* Tags Section with applied color */}
                    <div className={`border-t ${selectedColor.borderClass} p-6`}>
                        <label className='mb-3 block text-sm font-medium text-slate-700'>Tags</label>

                        <div className='mb-3 flex gap-2'>
                            <Input
                                value={newTag}
                                onChange={(e) => {
                                    addDebugLog(`Tag input changed: ${e.target.value}`);
                                    setNewTag(e.target.value);
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        addDebugLog('Enter pressed in tag input');
                                        handleAddTag();
                                    }
                                }}
                                placeholder='Add a tag...'
                                className='flex-1 border-slate-200 focus:border-blue-500 focus:ring-blue-500'
                            />
                            <Button variant='outline' onClick={handleAddTag} disabled={!newTag.trim()}>
                                <Tag className='h-4 w-4' />
                            </Button>
                        </div>

                        <div className='flex flex-wrap gap-2'>
                            {formData.tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    variant='secondary'
                                    className='border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700 transition-colors hover:bg-blue-100'>
                                    {tag}
                                    <button onClick={() => handleRemoveTag(tag)} className='ml-2 hover:text-red-600'>
                                        <X className='h-3 w-3' />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
