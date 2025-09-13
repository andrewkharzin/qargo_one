"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUser } from "@/lib/supabase/server"

// Create
export async function createNoteType({
  name,
  description,
  fields,
}: {
  name: string
  description?: string
  fields: any[]
}) {
  const supabase = await createSupabaseServerClient()
  const user = await getCurrentUser()
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase.from("note_types").insert({
    user_id: user.id,
    name,
    description,
    fields,
  }).select().single()

  if (error) throw error
  revalidatePath("/note-types")
  return data
}

// Read
export async function getNoteTypes() {
  const supabase = await createSupabaseServerClient()
  const user = await getCurrentUser()
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("note_types")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getNoteTypeById(id: string) {
  const supabase = await createSupabaseServerClient()
  const user = await getCurrentUser()
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("note_types")
    .select("*")
    .eq("user_id", user.id)
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

// Update
export async function updateNoteType(id: string, {
  name,
  description,
  fields,
}: {
  name: string
  description?: string
  fields: any[]
}) {
  const supabase = await createSupabaseServerClient()
  const user = await getCurrentUser()
  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("note_types")
    .update({ name, description, fields })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) throw error
  revalidatePath("/note-types")
  return data
}

// Delete
export async function deleteNoteType(id: string) {
  const supabase = await createSupabaseServerClient()
  const user = await getCurrentUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("note_types")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw error
  revalidatePath("/note-types")
  return true
}
