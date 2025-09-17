'use client';

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Settings,
  Plus,
  Trash2,
  GripVertical,
  Save,
  Eye,
  Code,
  Wand2,
  X,
  Download,
  FileTextIcon,
  ChevronDown,
  ChevronRight,
  Type,
  AlignLeft,
  CheckSquare,
  Calendar,
  Tag,
  User,
  Hash,
  ToggleLeft,
  FileText,
  AlertTriangle
} from "lucide-react";
import { createTemplateNote } from "../../actions/notes/noteTemplates";
import { useReactToPrint } from 'react-to-print';
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';

// Import our new modular components
import { Template, TemplateField } from "../../types/notes/templates";
import { fieldTypes } from "./config/fieldTypes";
import { predefinedTemplates } from "./config/predefinedTemplates";
import { noteTypes, categories } from "./types/noteTypes";
import { createDefaultTemplate, createNewField, validateTemplate, generatePreviewContent } from "./utils/templateUtils";
import { TemplatePreview } from "./templates/TemplatePreview";

interface AdvancedConstructorProps {
  onSave?: (template: Template) => void;
  onClose?: () => void;
  initialTemplate?: Template | null;
}

export default function AdvancedConstructor({ onSave, onClose, initialTemplate = null }: AdvancedConstructorProps) {
  const router = useRouter();
  const [template, setTemplate] = useState<Template>(createDefaultTemplate());
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

  const addField = (fieldTypeId: string) => {
    const newField = createNewField(fieldTypeId);
    
    setTemplate(prev => ({
      ...prev,
      fields: [...prev.fields, newField],
      updatedAt: new Date()
    }));

    setSelectedField(newField);
    setShowFieldLibrary(false);
  };

  const updateField = (fieldId: string, updates: Partial<TemplateField>) => {
    setTemplate(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
      updatedAt: new Date()
    }));

    if (selectedField && selectedField.id === fieldId) {
      setSelectedField({ ...selectedField, ...updates });
    }
  };

  const removeField = (fieldId: string) => {
    setTemplate(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId),
      updatedAt: new Date()
    }));

    if (selectedField?.id === fieldId) {
      setSelectedField(null);
    }
  };

  const loadPredefinedTemplate = (templateKey: string) => {
    const predefined = predefinedTemplates[templateKey];
    if (predefined) {
      setTemplate(prev => ({
        ...prev,
        ...predefined,
        updatedAt: new Date()
      }));
    }
  };

  const handleSave = async () => {
    const errors = validateTemplate(template);
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    setIsSaving(true);

    const templateNote = {
      title: template.name,
      content: template.description || `Template: ${template.name}`,
      note_type: template.noteType,
      // category_id omitted to satisfy optional string type
      is_template: true,
      templates_data: template,
      tags: ["template", "constructor", template.noteType, ...(template.tags || [])]
    };

    try {
      const result = await createTemplateNote(templateNote);

      if (result.success) {
        toast.success("Template saved successfully", {
          description: "Your template has been saved and is now available for use.",
        });
        onSave && onSave(template);
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
    const errors = validateTemplate(template);
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

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

  const handlePrint = useReactToPrint({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...( { content: () => printRef.current } as any ),
    documentTitle: `${template.name} - Template`,
  });

  const handleExportPDF = () => {
    toast.info("PDF export feature coming soon!", {
      description: "We're working on PDF export functionality.",
    });
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

  return (
    <div className="w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-2xl"></div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <span>Template Constructor</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
              Build custom templates for your aviation operations
            </p>
          </div>

          <div className="flex gap-2 md:gap-3">
            <Button
              variant="outline"
              onClick={handlePreview}
              disabled={template.fields.length === 0}
              className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-white/90 dark:bg-slate-800 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !template.name || template.fields.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl shadow-lg"
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
          <Card className="border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Start Templates
                </CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-36 h-8 text-xs">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="flight_operations">Flight Operations</SelectItem>
                      <SelectItem value="ground_operations">Ground Operations</SelectItem>
                      <SelectItem value="safety_security">Safety & Security</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="popular">
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Popular</SelectItem>
                      <SelectItem value="recent">Recent</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(predefinedTemplates).map(([key, tmpl]) => {
                  const getIcon = (noteType: string) => {
                    switch (noteType) {
                      case 'checklist': return CheckSquare;
                      case 'incident': return AlertTriangle;
                      case 'maintenance': return Settings;
                      case 'weather': return Calendar;
                      case 'manifest': return User;
                      case 'inspection': return Eye;
                      case 'fuel': return Hash;
                      case 'emergency': return AlertTriangle;
                      case 'flight_plan': return FileText;
                      default: return FileText;
                    }
                  };
                  const Icon = getIcon(tmpl.noteType);
                  
                  return (
                    <Card 
                      key={key}
                      className="group h-full border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg bg-white dark:bg-slate-900/60 overflow-hidden"
                    >
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Header */}
                        <div className="p-4 pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                {tmpl.name}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                {tmpl.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="px-4 pb-3 flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                              {tmpl.noteType.replace('_', ' ')}
                            </Badge>
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">v1.0</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>Admin</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              <span>{tmpl.fields.length} fields</span>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="px-4 pb-4 pt-0 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 h-8 text-xs hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-300 dark:hover:border-blue-600"
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                router.push(`/dashboard/notes/create?template=${key}`); 
                              }}
                            >
                              Use Template
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 px-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-800"
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                loadPredefinedTemplate(key); 
                              }}
                            >
                              Preview
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
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
            <Card className="border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm mb-6 bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  Template Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-900 dark:text-white">Template Name</Label>
                  <Input
                    value={template.name}
                    onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name..."
                    className="mt-1 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-900 dark:text-white">Description</Label>
                  <Textarea
                    value={template.description}
                    onChange={(e) => setTemplate(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe this template..."
                    className="mt-1 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-900 dark:text-white">Note Type</Label>
                    <Select
                      value={template.noteType}
                      onValueChange={(value) => setTemplate(prev => ({ ...prev, noteType: value }))}
                    >
                      <SelectTrigger className="mt-1 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                        <SelectValue placeholder="Select note type" />
                      </SelectTrigger>
                      <SelectContent>
                        {noteTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-900 dark:text-white">Category</Label>
                    <Select
                      value={template.category}
                      onValueChange={(value) => setTemplate(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="mt-1 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Field Library */}
            <Card className="border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm bg-white dark:bg-slate-900">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                    Field Library
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFieldLibrary(!showFieldLibrary)}
                    className="rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
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
                      className="space-y-2 max-h-96 overflow-y-auto pr-1"
                    >
                      {fieldTypes.map((fieldType) => (
                        <Button
                          key={fieldType.id}
                          variant="ghost"
                          className="w-full justify-start h-auto p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                          onClick={() => addField(fieldType.id)}
                        >
                          <fieldType.icon className="w-4 h-4 mr-3 text-slate-500 dark:text-slate-400" />
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
            <Card className="border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  Template Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                {template.fields.length === 0 ? (
                  <div className="text-center py-12">
                    <Settings className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">
                      Add fields from the library to build your template
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {template.fields.map((field, index) => (
                      <div
                        key={field.id}
                        className={`bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3 cursor-pointer transition-all ${
                          selectedField?.id === field.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedField(field)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-4 h-4 text-slate-400 dark:text-slate-500" />
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
                            className="text-slate-400 dark:text-slate-500 hover:text-red-500"
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
            <Card className="border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm sticky top-4 bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                  Field Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedField ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-900 dark:text-white">Label</Label>
                      <Input
                        value={selectedField.label}
                        onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                        className="mt-1 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-900 dark:text-white">Placeholder</Label>
                      <Input
                        value={selectedField.placeholder || ''}
                        onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
                        className="mt-1 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
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
                        <Label className="text-sm font-medium text-gray-900 dark:text-white">Options</Label>
                        <Textarea
                          value={selectedField.options?.join('\n') || ''}
                          onChange={(e) => updateField(selectedField.id, {
                            options: e.target.value.split('\n').filter(opt => opt.trim())
                          })}
                          placeholder="Option 1&#10;Option 2&#10;Option 3"
                          className="mt-1 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Code className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
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
          <DialogContent className="w-[95vw] sm:max-w-[95vw] md:max-w-5xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Preview Template: {template.name}</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <FileTextIcon className="w-4 h-4" />
                    Print
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
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
              <TabsList className="grid grid-cols-2 mb-6 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <TabsTrigger value="form" className="flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4" />
                  Form View
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview Content
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900 p-4 rounded-lg border border-blue-100 dark:border-slate-800">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <ChevronDown className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Interactive Form Preview
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
                    Fill out the form to see how the template will look with real data.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Form Fields */}
                  <div className="space-y-6">
                    {template.fields.map((field) => (
                      <div key={field.id} className="bg-white dark:bg-slate-900/60 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                        <Label className="text-sm font-medium flex items-center mb-3">
                          <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs mr-2">
                            {fieldTypes.find(ft => ft.id === field.type)?.label}
                          </span>
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        {renderPreviewField(field)}
                        {field.placeholder && (
                          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                            Placeholder: {field.placeholder}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Live Preview */}
                  <div>
                    <div className="bg-white dark:bg-slate-900/60 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm h-full">
                      <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                        Live Preview
                      </h4>
                      <div className="prose prose-blue max-w-none dark:prose-invert">
                        <pre className="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-slate-950 p-4 rounded border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200">
                          {generatePreviewContent(template, previewValues)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-900 p-4 rounded-lg border border-green-100 dark:border-slate-800 mb-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
                    <FileTextIcon className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Final Document Preview
                  </h3>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    This is how your completed document will appear. Use the Print or PDF buttons above to export.
                  </p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <TemplatePreview 
                    template={template} 
                    previewValues={previewValues} 
                    ref={printRef} 
                  />
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
    </div>
  );
}