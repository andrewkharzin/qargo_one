// components/TiptapEditor.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import {
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Minus,
    Quote,
    Redo,
    Underline as UnderlineIcon,
    Undo
} from 'lucide-react';

// components/TiptapEditor.tsx

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline'
                }
            })
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
                placeholder: placeholder
            }
        },
        immediatelyRender: false // Add this line
    });

    if (!editor) {
        return <div className='h-32 animate-pulse rounded-lg bg-gray-100'></div>;
    }

    const addLink = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    return (
        <div className='overflow-hidden rounded-xl border border-slate-200'>
            {/* Toolbar */}
            <div className='flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2'>
                {/* Text formatting */}
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-slate-200' : ''}
                    title='Bold'>
                    <Bold className='h-4 w-4' />
                </Button>

                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-slate-200' : ''}
                    title='Italic'>
                    <Italic className='h-4 w-4' />
                </Button>

                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'bg-slate-200' : ''}
                    title='Underline'>
                    <UnderlineIcon className='h-4 w-4' />
                </Button>

                <Separator orientation='vertical' className='mx-1 h-6' />

                {/* Headings */}
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'bg-slate-200' : ''}
                    title='Heading 1'>
                    <Heading1 className='h-4 w-4' />
                </Button>

                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}
                    title='Heading 2'>
                    <Heading2 className='h-4 w-4' />
                </Button>

                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'bg-slate-200' : ''}
                    title='Heading 3'>
                    <Heading3 className='h-4 w-4' />
                </Button>

                <Separator orientation='vertical' className='mx-1 h-6' />

                {/* Lists */}
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-slate-200' : ''}
                    title='Bullet List'>
                    <List className='h-4 w-4' />
                </Button>

                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-slate-200' : ''}
                    title='Numbered List'>
                    <ListOrdered className='h-4 w-4' />
                </Button>

                <Separator orientation='vertical' className='mx-1 h-6' />

                {/* Block elements */}
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'bg-slate-200' : ''}
                    title='Blockquote'>
                    <Quote className='h-4 w-4' />
                </Button>

                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'bg-slate-200' : ''}
                    title='Code Block'>
                    <Code className='h-4 w-4' />
                </Button>

                <Separator orientation='vertical' className='mx-1 h-6' />

                {/* Link */}
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={addLink}
                    className={editor.isActive('link') ? 'bg-slate-200' : ''}
                    title='Add Link'>
                    <LinkIcon className='h-4 w-4' />
                </Button>

                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive('link')}
                    title='Remove Link'>
                    <LinkIcon className='h-4 w-4 rotate-45' />
                </Button>

                <Separator orientation='vertical' className='mx-1 h-6' />

                {/* Horizontal rule */}
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title='Horizontal Line'>
                    <Minus className='h-4 w-4' />
                </Button>

                <Separator orientation='vertical' className='mx-1 h-6' />

                {/* Undo/Redo */}
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title='Undo'>
                    <Undo className='h-4 w-4' />
                </Button>

                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title='Redo'>
                    <Redo className='h-4 w-4' />
                </Button>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className='min-h-[200px]' />
        </div>
    );
}
