"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { createNoteType } from "@/actions/notes/noteTypes"

export default function NewNoteTypePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [fields, setFields] = useState<any[]>([])

  const addField = () => setFields([...fields, { name: "", type: "text" }])
  const updateField = (i: number, key: string, value: string) => {
    const copy = [...fields]
    copy[i][key] = value
    setFields(copy)
  }

  const saveType = async () => {
    try {
      await createNoteType({ name, description, fields })
      router.push("/note-types")
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">New Note Type</h1>
      <Card>
        <CardContent className="space-y-4">
          <Input placeholder="Type name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className="space-y-3">
            <h2 className="font-semibold">Fields</h2>
            {fields.map((f, i) => (
              <div key={i} className="flex gap-2">
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
              </div>
            ))}
            <Button onClick={addField} variant="outline">+ Add Field</Button>
          </div>

          <Button onClick={saveType}>Save</Button>
        </CardContent>
      </Card>
    </div>
  )
}
