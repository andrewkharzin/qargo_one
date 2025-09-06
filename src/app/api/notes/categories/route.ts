import { NextResponse } from 'next/server';
import { getNoteCategories } from '@/actions/notes/categories';

export async function GET() {
  try {
    const { categories, error } = await getNoteCategories();

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
