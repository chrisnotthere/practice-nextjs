import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

// This middleware is used to check if the user is still authenticated
// Since the user's session is tracked in a cookie, we need to read this cookie and update it if necessary.
export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}
