import AdvancedConstructor from '@/components/notes/AdvancedConstructor';
import { Breadcrumb } from '@/components/ui/reuse/Breadcrumb';

export default function TemplateConstructorPage() {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Notes', href: '/dashboard/notes' },
    { label: 'Template Builder', href: '/dashboard/notes/builder', isCurrent: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        {/* Main Content */}
        <AdvancedConstructor />
      </div>
    </div>
  );
}
