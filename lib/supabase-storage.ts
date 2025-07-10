import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function uploadToSupabase(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage.from("images").upload(fileName, file)

  if (error) throw error

  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(fileName)

  return publicUrl
}
