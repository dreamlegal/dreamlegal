// components/Editor.tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useState, useRef } from 'react'

const MenuBar = ({ editor }) => {
  const fileInputRef = useRef(null)
  
  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:')
    
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        editor.chain().focus().setImage({ src: e.target.result }).run()
      }
      reader.readAsDataURL(file)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-2 border rounded-md bg-gray-50">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 border rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 border rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1 border rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1 border rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 border rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 border rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
      >
        Ordered List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1 border rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
      >
        Quote
      </button>
      <button
        onClick={addImage}
        className="p-1 border rounded"
      >
        Image URL
      </button>
      <button
        onClick={() => fileInputRef.current.click()}
        className="p-1 border rounded"
      >
        Upload Image
      </button>
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept="image/*" 
        onChange={handleFileUpload} 
      />
    </div>
  )
}

export default function Editor({ onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: '<p>Start writing your blog post here...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="border rounded-md">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="p-4 min-h-[400px]" />
    </div>
  )
}