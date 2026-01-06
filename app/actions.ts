'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export type WaitlistState = {
  status: 'idle' | 'success' | 'error';
  message: string;
}

export async function joinWaitlist(prevState: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const handle = formData.get('handle') as string
  const email = formData.get('email') as string

  if (!handle || handle.length < 3) {
    return { status: 'error', message: 'Handle must be at least 3 characters.' }
  }
  
  const handleRegex = /^[a-zA-Z0-9_]+$/
  if (!handleRegex.test(handle)) {
    return { status: 'error', message: 'Handle can only contain letters, numbers, and underscores.' }
  }

  if (!email || !email.includes('@')) {
    return { status: 'error', message: 'Please enter a valid email.' }
  }

  const { error } = await supabase
    .from('waitlist')
    .insert([
      { handle: handle.toLowerCase(), email: email.toLowerCase() }
    ])

  if (error) {
    if (error.code === '23505') {
      if (error.message.includes('handle')) {
        return { status: 'error', message: 'That handle is already taken. You gotta be faster!' }
      }
      if (error.message.includes('email')) {
        return { status: 'error', message: 'You are already on the list!' }
      }
    }
    console.error('Supabase Error:', error)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }

  return { status: 'success', message: "You're in." }
}