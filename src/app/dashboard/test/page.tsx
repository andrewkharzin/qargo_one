'use client';

import { useState } from 'react';
import { createNote } from '@/actions/notes';

export default function TestPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testCreateNote = async () => {
    addLog('🧪 Testing createNote...');

    try {
      const result = await createNote({
        title: 'Test Note',
        content: '<p>Test content</p>',
        category_id: undefined,
        is_public: false,
        type: 'note',
        priority: 3,
        urgency: 3,
      });

      addLog('✅ Result: ' + JSON.stringify(result));
    } catch (error) {
      addLog('❌ Error: ' + error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <button
        onClick={testCreateNote}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Test createNote Action
      </button>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Logs:</h2>
        <div className="text-sm space-y-1">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
