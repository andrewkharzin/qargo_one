"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { createNoteType } from "@/actions/notes/noteTypes"

export default function NoteTypeForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [fields, setFields] = useState<{ name: string; type: string }[]>([])

  const addField = () => setFields([...fields, { name: "", type: "text" }])

  const updateField = (index: number, key: string, value: string) => {
    const updated = [...fields]
    updated[index][key as "name" | "type"] = value
    setFields(updated)
  }

  const removeField = (index: number) => {
    const updated = fields.filter((_, i) => i !== index)
    setFields(updated)
  }

  const handleSave = async () => {
    if (!name) return toast.error("Type name is required")
    try {
      await createNoteType({ name, description, fields })
      toast.success("Note type created!")
      router.push("/dashboard/notes/note-types")
    } catch (err: any) {
      toast.error(err.message || "Failed to create note type")
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Note Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Type name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="space-y-3">
            <h2 className="font-semibold">Fields</h2>
            {fields.map((f, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input
                  placeholder="Field name"
                  value={f.name}
                  onChange={(e) => updateField(i, "name", e.target.value)}
                />
                <select
                  className="border rounded p-2"
                  value={f.type}
                  onChange={(e) => updateField(i, "type", e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="boolean">Checkbox</option>
                </select>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeField(i)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={addField} variant="outline">
              + Add Field
            </Button>
          </div>

          <Button onClick={handleSave}>Save Note Type</Button>
        </CardContent>
      </Card>
    </div>
  )
}
