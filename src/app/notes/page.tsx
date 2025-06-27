'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import React from 'react';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-3 py-1 rounded ${editor.isActive('underline') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        U
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 rounded ${editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        • List
      </button>
    </div>
  );
};

export default function NotesPage() {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '<p>Write your note here...</p>',
  });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">QuickNotes Editor</h1>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
        <MenuBar editor={editor} />
        <div className="border border-gray-300 rounded-md p-4 min-h-[200px]">
          <EditorContent editor={editor} />
        </div>
      </div>
    </main>
  );
}
