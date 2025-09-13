'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Edit3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NoteType {
  id: string;
  name: string;
  description?: string;
  custom_fields?: Record<string, any>;
}

interface NoteTypeCardProps {
  type: NoteType;
  onDelete: (id: string) => Promise<void>;
}

export function NoteTypeCard({ type, onDelete }: NoteTypeCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await onDelete(type.id);
      toast.success('Note type deleted successfully!');
      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete note type.');
    }
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow dark:bg-slate-800">
      <CardHeader className="flex justify-between items-start">
        <CardTitle className="text-lg font-semibold text-slate-700 dark:text-slate-100">
          {type.name}
        </CardTitle>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/note-types/${type.id}`)}
          >
            <Edit3 className="h-4 w-4" />
          </Button>

          {/* Dialog for delete */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the note type <strong>{type.name}</strong>?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="text-slate-600 dark:text-slate-300">
        {type.description || 'No description'}
        {type.custom_fields && (
          <pre className="mt-2 text-xs bg-slate-100 dark:bg-slate-700 p-2 rounded">
            {JSON.stringify(type.custom_fields, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}
