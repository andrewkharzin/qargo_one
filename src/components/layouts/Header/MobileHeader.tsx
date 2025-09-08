import { SidebarTrigger } from "@/components/ui/sidebar";

interface MobileHeaderProps {
  onToggle: () => void;
}

export default function MobileHeader({ onToggle }: MobileHeaderProps) {
  return (
    <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 lg:hidden">
      <div className="flex items-center gap-4">
        <SidebarTrigger 
          className="hover:bg-slate-100 p-2 rounded-xl transition-colors duration-200"
          onClick={onToggle}
        />
        <h1 className="text-xl font-bold text-slate-900">Ultimate Notes</h1>
      </div>
    </header>
  );
}