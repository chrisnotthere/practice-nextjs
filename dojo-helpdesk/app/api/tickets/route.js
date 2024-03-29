import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(req) {
  const ticket = await req.json();

  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies });

  // get current user session
  const { data: { session } } = await supabase.auth.getSession();

  // insert data into supabase
  const { data, error } = await supabase.from('tickets')
    .insert({
        ...ticket,
        user_email: session.user.email
      })
      .select()
      .single();

  return NextResponse.json({ data, error })
}
