'use client';

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Settings,
  Plus,
  Trash2,
  GripVertical,
  Type,
  AlignLeft,
  CheckSquare,
  Calendar,
  Tag,
  User,
  Hash,
  ToggleLeft,
  FileText,
  Save,
  Eye,
  Code,
  Wand2,
  X,
  Download,
  FileTextIcon,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { createTemplateNote } from "@/actions/notes/noteTemplates";
import { useReactToPrint } from 'react-to-print';

// Define field types
const fieldTypes = [
  { id: 'text', label: 'Text Input', icon: Type, description: 'Single line text input' },
  { id: 'textarea', label: 'Text Area', icon: AlignLeft, description: 'Multi-line text input' },
  { id: 'select', label: 'Select Dropdown', icon: CheckSquare, description: 'Dropdown selection' },
  { id: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'True/false option' },
  { id: 'date', label: 'Date Picker', icon: Calendar, description: 'Date selection' },
  { id: 'tags', label: 'Tags Input', icon: Tag, description: 'Multi-tag input' },
  { id: 'user', label: 'User Select', icon: User, description: 'User assignment' },
  { id: 'number', label: 'Number', icon: Hash, description: 'Numeric input' },
  { id: 'toggle', label: 'Toggle Switch', icon: ToggleLeft, description: 'On/off switch' },
  { id: 'rich_text', label: 'Rich Text Editor', icon: FileText, description: 'WYSIWYG editor' }
];

// Predefined templates
const predefinedTemplates = {
  flight_inspection: {
    name: "Flight Inspection Checklist",
    description: "Pre-flight safety inspection template",
    noteType: "checklist",
    category: "flight_operations",
    fields: [
      { id: '1', type: 'text', label: 'Aircraft Registration', required: true, placeholder: 'e.g., N12345' },
      { id: '2', type: 'select', label: 'Aircraft Type', required: true, options: ['B737-800', 'A320', 'B777-300ER', 'A350-900'] },
      { id: '3', type: 'text', label: 'Flight Number', required: true, placeholder: 'e.g., AA1234' },
      { id: '4', type: 'date', label: 'Inspection Date', required: true },
      { id: '5', type: 'user', label: 'Inspector', required: true },
      { id: '6', type: 'textarea', label: 'Weather Conditions', placeholder: 'Current weather conditions...' },
      { id: '7', type: 'checkbox', label: 'Fuel Quantity Check', required: true },
      { id: '8', type: 'checkbox', label: 'Landing Gear Inspection', required: true },
      { id: '9', type: 'checkbox', label: 'Engine Parameters Normal', required: true },
      { id: '10', type: 'textarea', label: 'Additional Notes', placeholder: 'Any additional observations...' }
    ]
  },
  incident_report: {
    name: "Aviation Incident Report",
    description: "Comprehensive incident documentation",
    noteType: "incident",
    category: "safety_security",
    fields: [
      { id: '1', type: 'text', label: 'Incident ID', required: true, placeholder: 'Auto-generated' },
      { id: '2', type: 'date', label: 'Incident Date/Time', required: true },
      { id: '3', type: 'text', label: 'Location', required: true, placeholder: 'Airport/Gate/etc.' },
      { id: '4', type: 'select', label: 'Severity Level', required: true, options: ['Minor', 'Moderate', 'Major', 'Critical'] },
      { id: '5', type: 'textarea', label: 'Incident Description', required: true, placeholder: 'Detailed description of the incident...' },
      { id: '6', type: 'tags', label: 'Involved Parties', placeholder: 'Personnel, passengers, equipment...' },
      { id: '7', type: 'textarea', label: 'Immediate Actions Taken', required: true },
      { id: '8', type: 'user', label: 'Reported By', required: true },
      { id: '9', type: 'textarea', label: 'Root Cause Analysis', placeholder: 'Analysis of underlying causes...' },
      { id: '10', type: 'textarea', label: 'Preventive Measures', placeholder: 'Recommendations to prevent recurrence...' }
    ]
  },
  sop_template: {
    name: "Standard Operating Procedure",
    description: "Structured SOP documentation template",
    noteType: "sop",
    category: "flight_operations",
    fields: [
      { id: '1', type: 'text', label: 'SOP Number', required: true, placeholder: 'SOP-XXX-001' },
      { id: '2', type: 'text', label: 'Version', required: true, placeholder: '1.0' },
      { id: '3', type: 'date', label: 'Effective Date', required: true },
      { id: '4', type: 'user', label: 'Approved By', required: true },
      { id: '5', type: 'textarea', label: 'Purpose & Scope', required: true, placeholder: 'Define the purpose and scope of this procedure...' },
      { id: '6', type: 'rich_text', label: 'Procedure Steps', required: true },
      { id: '7', type: 'textarea', label: 'Responsibilities', placeholder: 'Define roles and responsibilities...' },
      { id: '8', type: 'textarea', label: 'Safety Considerations', placeholder: 'Safety requirements and precautions...' },
      { id: '9', type: 'tags', label: 'Related Documents', placeholder: 'References, regulations, etc.' },
      { id: '10', type: 'date', label: 'Review Date', required: true }
    ]
  }
};

interface TemplateField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface Template {
  name: string;
  description: string;
  noteType: string;
  category: string;
  fields: TemplateField[];
}

interface AdvancedConstructorProps {
  onSave?: () => void;
  onClose?: () => void;
  initialTemplate?: Template | null;
}

export default function AdvancedConstructor({ onSave, onClose, initialTemplate = null }: AdvancedConstructorProps) {
  const [template, setTemplate] = useState<Template>({
    name: '',
    description: '',
    noteType: 'simple_note',
    category: '',
    fields: []
  });

  const [selectedField, setSelectedField] = useState<TemplateField | null>(null);
  const [showFieldLibrary, setShowFieldLibrary] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewValues, setPreviewValues] = useState<Record<string, any>>({});
const [activePreviewTab, setActivePreviewTab] = useState("form");
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialTemplate) {
      setTemplate(initialTemplate);
    }
  }, [initialTemplate]);

  const addField = (fieldType: typeof fieldTypes[0]) => {
    const newField: TemplateField = {
      id: Date.now().toString(),
      type: fieldType.id,
      label: `New ${fieldType.label}`,
      placeholder: '',
      required: false,
      options: fieldType.id === 'select' ? ['Option 1', 'Option 2'] : undefined
    };

    setTemplate(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));

    setSelectedField(newField);
    setShowFieldLibrary(false);
  };

  const updateField = (fieldId: string, updates: Partial<TemplateField>) => {
    setTemplate(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));

    if (selectedField && selectedField.id === fieldId) {
      setSelectedField({ ...selectedField, ...updates });
    }
  };

  const removeField = (fieldId: string) => {
    setTemplate(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }));

    if (selectedField?.id === fieldId) {
      setSelectedField(null);
    }
  };

  const loadPredefinedTemplate = (templateKey: keyof typeof predefinedTemplates) => {
    const predefined = predefinedTemplates[templateKey];
    setTemplate(prev => ({
      ...prev,
      ...predefined
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    const templateNote = {
      title: template.name,
      content: template.description || `Template: ${template.name}`,
      note_type: template.noteType,
      category_id: null,
      templates_data: template,
      tags: ["template", "constructor", template.noteType]
    };

    try {
      const result = await createTemplateNote(templateNote);

      if (result.success) {
        toast.success("Template saved successfully", {
          description: "Your template has been saved and is now available for use.",
        });
        onSave && onSave();
        onClose && onClose();
      } else {
        toast.error("Failed to save template", {
          description: result.error || "Please try again.",
        });
      }
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    setShowPreviewModal(true);
    // Initialize preview values
    const initialValues: Record<string, any> = {};
    template.fields.forEach(field => {
      if (field.type === 'checkbox') {
        initialValues[field.id] = false;
      } else if (field.type === 'select' && field.options && field.options.length > 0) {
        initialValues[field.id] = field.options[0];
      } else {
        initialValues[field.id] = '';
      }
    });
    setPreviewValues(initialValues);
  };

  const renderPreviewField = (field: TemplateField) => {
    const value = previewValues[field.id] || '';

    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => setPreviewValues(prev => ({ ...prev, [field.id]: e.target.value }))}
            placeholder={field.placeholder}
            className="w-full"
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => setPreviewValues(prev => ({ ...prev, [field.id]: e.target.value }))}
            placeholder={field.placeholder}
            className="w-full min-h-[100px]"
          />
        );

      case 'select':
        return (
          <Select
            value={value}
            onValueChange={(val) => setPreviewValues(prev => ({ ...prev, [field.id]: val }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`preview-${field.id}`}
              checked={value}
              onChange={(e) => setPreviewValues(prev => ({ ...prev, [field.id]: e.target.checked }))}
              className="rounded"
            />
            <Label htmlFor={`preview-${field.id}`} className="text-sm">
              {field.label}
            </Label>
          </div>
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => setPreviewValues(prev => ({ ...prev, [field.id]: e.target.value }))}
            className="w-full"
          />
        );

      default:
        return (
          <Input
            value={value}
            onChange={(e) => setPreviewValues(prev => ({ ...prev, [field.id]: e.target.value }))}
            placeholder={field.placeholder}
            className="w-full"
          />
        );
    }
  };

  const generatePreviewContent = () => {
    let content = `# ${template.name}\n\n`;

    if (template.description) {
      content += `*${template.description}*\n\n`;
    }

    template.fields.forEach(field => {
      const value = previewValues[field.id] || '';
      content += `## ${field.label}\n`;

      if (field.type === 'checkbox') {
        content += value ? '✅ Да' : '❌ Нет';
      } else if (field.type === 'select') {
        content += value || `*${field.placeholder || 'Не выбрано'}*`;
      } else {
        content += value || `*${field.placeholder || 'Не заполнено'}*`;
      }

      content += '\n\n';
    });

    return content;
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${template.name} - Template`,
  });

  const handleExportPDF = () => {
    toast.info("PDF export feature coming soon!", {
      description: "We're working on PDF export functionality.",
    });
    // В будущем можно реализовать через библиотеку like jsPDF
  };

  const generateStyledPreviewContent = () => {
    return (
      <div ref={printRef} className="p-6 bg-white text-gray-900">
        {/* Header */}
        <div className="text-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">{template.name}</h1>
          {template.description && (
            <p className="text-lg text-gray-600 italic">{template.description}</p>
          )}
          <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500">
            <span>Type: {template.noteType}</span>
            <span>•</span>
            <span>Category: {template.category}</span>
            <span>•</span>
            <span>Created: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {template.fields.map((field, index) => {
            const value = previewValues[field.id] || '';
            return (
              <div key={field.id} className="border-l-4 border-blue-200 pl-4 py-2">
                <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center">
                  <ChevronRight className="w-5 h-5 mr-2 text-blue-600" />
                  {field.label}
                  {field.required && <span className="text-red-500 ml-2 text-sm">*</span>}
                </h3>

                <div className="ml-7">
                  {field.type === 'checkbox' ? (
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded border-2 mr-3 flex items-center justify-center ${
                        value ? 'bg-green-500 border-green-500' : 'bg-red-100 border-gray-300'
                      }`}>
                        {value && <span className="text-white text-sm">✓</span>}
                      </div>
                      <span className={value ? "text-green-700 font-medium" : "text-gray-600"}>
                        {value ? 'Completed' : 'Not Completed'}
                      </span>
                    </div>
                  ) : (
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {value || (
                        <span className="text-gray-400 italic">
                          {field.placeholder || 'Not specified'}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {field.type === 'select' && field.options && (
                  <div className="ml-7 mt-1">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Selected from: {field.options.join(', ')}
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
          <p>Generated from template on {new Date().toLocaleDateString()}</p>
          <p className="mt-1">Template ID: {template.name.toLowerCase().replace(/\s+/g, '-')}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              Template Constructor
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Build custom templates for your aviation operations
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePreview}
              disabled={template.fields.length === 0}
              className="px-6 py-3 rounded-xl bg-white/90 dark:bg-slate-800 backdrop-blur-sm border-slate-200 dark:border-slate-700"
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !template.name || template.fields.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSaving ? 'Saving...' : 'Save Template'}
            </Button>
          </div>
        </motion.div>

        {/* Predefined Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-0 rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                Quick Start Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(predefinedTemplates).map(([key, tmpl]) => (
                  <Button
                    key={key}
                    variant="outline"
                    className="h-auto p-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 justify-start"
                    onClick={() => loadPredefinedTemplate(key as keyof typeof predefinedTemplates)}
                  >
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {tmpl.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {tmpl.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Constructor Interface */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Template Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 rounded-xl shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                  Template Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-900 dark:text-white">Template Name</Label>
                  <Input
                    value={template.name}
                    onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name..."
                    className="mt-1 rounded-lg border-slate-200 dark:border-slate-600"
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-900 dark:text-white">Description</Label>
                  <Textarea
                    value={template.description}
                    onChange={(e) => setTemplate(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe this template..."
                    className="mt-1 rounded-lg border-slate-200 dark:border-slate-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-900 dark:text-white">Note Type</Label>
                    <Select
                      value={template.noteType}
                      onValueChange={(value) => setTemplate(prev => ({ ...prev, noteType: value }))}
                    >
                      <SelectTrigger className="mt-1 rounded-lg border-slate-200 dark:border-slate-600">
                        <SelectValue placeholder="Select note type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple_note">Simple Note</SelectItem>
                        <SelectItem value="sop">SOP</SelectItem>
                        <SelectItem value="procedure">Procedure</SelectItem>
                        <SelectItem value="checklist">Checklist</SelectItem>
                        <SelectItem value="incident">Incident</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold text-gray-900 dark:text-white">Category</Label>
                    <Select
                      value={template.category}
                      onValueChange={(value) => setTemplate(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="mt-1 rounded-lg border-slate-200 dark:border-slate-600">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flight_operations">Flight Operations</SelectItem>
                        <SelectItem value="ground_handling">Ground Handling</SelectItem>
                        <SelectItem value="safety_security">Safety & Security</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Field Library */}
            <Card className="border-0 rounded-xl shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                    Field Library
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFieldLibrary(!showFieldLibrary)}
                    className="rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {showFieldLibrary && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 max-h-96 overflow-y-auto"
                    >
                      {fieldTypes.map((fieldType) => (
                        <Button
                          key={fieldType.id}
                          variant="ghost"
                          className="w-full justify-start h-auto p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                          onClick={() => addField(fieldType)}
                        >
                          <fieldType.icon className="w-4 h-4 mr-3 text-slate-500" />
                          <div className="text-left">
                            <div className="font-medium text-sm text-gray-900 dark:text-white">
                              {fieldType.label}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {fieldType.description}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Template Builder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                  Template Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                {template.fields.length === 0 ? (
                  <div className="text-center py-12">
                    <Settings className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">
                      Add fields from the library to build your template
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {template.fields.map((field, index) => (
                      <div
                        key={field.id}
                        className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-3 cursor-pointer transition-all ${
                          selectedField?.id === field.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedField(field)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-4 h-4 text-slate-400" />
                            <div>
                              <div className="font-medium text-sm text-gray-900 dark:text-white">
                                {field.label}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                {fieldTypes.find(ft => ft.id === field.type)?.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeField(field.id);
                            }}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Field Properties */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 rounded-xl shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                  Field Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedField ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-900 dark:text-white">Label</Label>
                      <Input
                        value={selectedField.label}
                        onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                        className="mt-1 rounded-lg border-slate-200 dark:border-slate-600"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-gray-900 dark:text-white">Placeholder</Label>
                      <Input
                        value={selectedField.placeholder || ''}
                        onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
                        className="mt-1 rounded-lg border-slate-200 dark:border-slate-600"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="required"
                        checked={selectedField.required}
                        onChange={(e) => updateField(selectedField.id, { required: e.target.checked })}
                        className="rounded"
                      />
                      <Label htmlFor="required" className="text-sm font-medium text-gray-900 dark:text-white">
                        Required field
                      </Label>
                    </div>

                    {selectedField.type === 'select' && (
                      <div>
                        <Label className="text-sm font-semibold text-gray-900 dark:text-white">Options</Label>
                        <Textarea
                          value={selectedField.options?.join('\n') || ''}
                          onChange={(e) => updateField(selectedField.id, {
                            options: e.target.value.split('\n').filter(opt => opt.trim())
                          })}
                          placeholder="Option 1&#10;Option 2&#10;Option 3"
                          className="mt-1 rounded-lg border-slate-200 dark:border-slate-600"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Code className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">
                      Select a field to edit its properties
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Preview Modal */}
        <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Preview Template: {template.name}</span>
                <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="flex items-center gap-2"
                >
                  <FileTextIcon className="w-4 h-4" />
                  Print
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportPDF}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPreviewModal(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              </DialogTitle>
            </DialogHeader>

             <Tabs value={activePreviewTab} onValueChange={setActivePreviewTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="form" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Form View
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview Content
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form" className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <ChevronDown className="w-5 h-5 mr-2 text-blue-600" />
                  Interactive Form Preview
                </h3>
                <p className="text-blue-700 text-sm mb-4">
                  Fill out the form to see how the template will look with real data.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form Fields */}
                <div className="space-y-6">
                  {template.fields.map((field) => (
                    <div key={field.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
                      <Label className="text-sm font-medium flex items-center mb-3">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-2">
                          {fieldTypes.find(ft => ft.id === field.type)?.label}
                        </span>
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      {renderPreviewField(field)}
                      {field.placeholder && (
                        <p className="text-xs text-gray-500 mt-2">
                          Placeholder: {field.placeholder}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Live Preview */}
                <div>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border shadow-sm h-full">
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-green-600" />
                      Live Preview
                    </h4>
                    <div className="prose prose-blue max-w-none">
                      <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded border">
                        {generatePreviewContent()}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2 text-green-600" />
                  Final Document Preview
                </h3>
                <p className="text-green-700 text-sm">
                  This is how your completed document will appear. Use the Print or PDF buttons above to export.
                </p>
              </div>

              <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
                {generateStyledPreviewContent()}
              </div>
            </TabsContent>
          </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
