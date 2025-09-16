'use client';

import { useState, useEffect } from "react";
import { getTemplateNotes } from '@/actions/notes/noteTemplates';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Sparkles, Edit3, LayoutTemplate } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface TemplateNote {
  id: string;
  title: string;
  content: string;
  templates_data: {
    noteType: string;
    fields: any[];
    description?: string;
  } | null;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<TemplateNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTemplates() {
      try {
        setIsLoading(true);
        const result = await getTemplateNotes();

        if (!result.success) {
          setError(result.error || "Failed to load templates");
          return;
        }

        // Filter only records that are actually templates
        const filteredTemplates = (result.data || []).filter((note: any) =>
          note.templates_data !== null && typeof note.templates_data === 'object'
        );

        setTemplates(filteredTemplates);
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error loading templates:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadTemplates();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3 relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                  <LayoutTemplate className="w-6 h-6 text-white" />
                </div>
                <span>Templates Library</span>
                <Sparkles className="h-5 w-5 text-yellow-400" />
              </h1>
              <p className="text-slate-600 dark:text-slate-400 relative">
                Create and manage your note templates for efficient workflows
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden dark:bg-slate-800/80 dark:border-slate-700/30 h-full flex flex-col animate-pulse">
                <CardHeader className="pb-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700 mb-3"></div>
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                  <div className="flex justify-between mt-4">
                    <div className="h-9 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-9 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg dark:bg-slate-800/80">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
            Error loading templates
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {error}
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <LayoutTemplate className="w-6 h-6 text-white" />
              </div>
              <span>Templates Library</span>
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </h1>
            <p className="text-slate-600 dark:text-slate-400 relative">
              Create and manage your note templates for efficient workflows
            </p>
          </div>

          <Link href="/dashboard/notes/builder">
            <Button className="bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all">
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </Link>
        </div>

        {templates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg dark:bg-slate-800/80"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No templates yet</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Create your first template to get started with structured note-taking
            </p>
            <Link href="/dashboard/notes/builder">
              <Button className="bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group dark:bg-slate-800/80 dark:border-slate-700/30 h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 mb-3">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50">
                        {template.templates_data?.noteType || 'Template'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {template.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      {template.templates_data?.fields?.length || 0} fields
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                      {template.templates_data?.description || template.content || 'No description available'}
                    </p>
                    <div className="flex justify-between mt-auto pt-4">
                      <Link href={`/templates/${template.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                        >
                          Use Template
                        </Button>
                      </Link>
                      <Link href={`/templates/constructor?edit=${template.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-200 dark:border-slate-700"
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
