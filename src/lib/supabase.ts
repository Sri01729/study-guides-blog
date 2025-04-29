import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  updated_at?: string
}

export type Document = {
  id: string
  title: string
  description: string
  content: string
  category: string
  slug: string
  author_id: string
  created_at: string
  updated_at: string
}