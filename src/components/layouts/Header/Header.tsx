export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Ultimate Notes</h1>
          </div>
          <nav className="flex space-x-8">
            {/* Навигация для гостевого layout */}
          </nav>
        </div>
      </div>
    </header>
  );
}