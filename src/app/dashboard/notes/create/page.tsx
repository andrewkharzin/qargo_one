import { getNoteCategories } from '@/actions/notes/categories';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Category } from '@/types/notes';

import CreateNoteClient from './CreateNoteClient';

export default async function CreateNotePage() {
    const { categories, error } = await getNoteCategories();

    if (error) {
        throw new Error(error);
    }

    return (
        <ErrorBoundary>
            <CreateNoteClient categories={categories || ([] as Category[])} />
        </ErrorBoundary>
    );
}
