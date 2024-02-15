'use server'

import { cookies } from "next/headers"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addTicket(formData){
  const ticket = Object.fromEntries(formData)
  
  const supabase = createServerActionClient({ cookies })

  const { data: { session }} = await supabase.auth.getSession()

  const { error } = await supabase.from('tickets')
  .insert({
    ...ticket,
    user_email: session.user.email
  })

  if (error) {
    throw new Error('Could not add ticket.')
  }

  revalidatePath('/tickets')
  redirect('/tickets') // no error
}

export async function deleteTicket(id){
  const supabase = createServerActionClient({ cookies })

  const { error } = await supabase.from('tickets')
  .delete()
  .eq('id', id)

  if (error) {
    throw new Error('Could not delete ticket.')
  }

  revalidatePath('/tickets')
  redirect('/tickets') // error
}

