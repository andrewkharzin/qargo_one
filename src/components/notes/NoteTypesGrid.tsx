"use client"

import { useState, useEffect } from "react"
import { NoteTypeCard } from "./NoteTypeCard"
import { toast } from "sonner"

interface NoteType {
  id: string
  name: string
  description?: string
  custom_fields?: Record<string, any>
}

interface NoteTypesGridProps {
  initialNoteTypes: NoteType[]
}

export function NoteTypesGrid({ initialNoteTypes }: NoteTypesGridProps) {
  const [noteTypes, setNoteTypes] = useState(initialNoteTypes)

  const handleDelete = async (id: string) => {
    try {
      // call your Supabase delete action here
      const res = await fetch(`/api/note-types/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      setNoteTypes((prev) => prev.filter((t) => t.id !== id))
      toast.success("Note type deleted!")
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete note type.")
    }
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {noteTypes.map((type) => (
        <NoteTypeCard
          key={type.id}
          id={type.id}
          name={type.name}
          description={type.description}
          custom_fields={type.custom_fields}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
