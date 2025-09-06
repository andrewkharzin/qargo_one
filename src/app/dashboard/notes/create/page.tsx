import { getNoteCategories } from '@/actions/notes/categories';
import CreateNoteClient from './CreateNoteClient';
import { Category } from '@/types/notes';
import ErrorBoundary from '@/components/ErrorBoundary';

export default async function CreateNotePage() {
  const { categories, error } = await getNoteCategories();

  if (error) {
    throw new Error(error);
  }

  return (
    <ErrorBoundary>
      <CreateNoteClient categories={categories || [] as Category[]} />
    </ErrorBoundary>
  );
}
