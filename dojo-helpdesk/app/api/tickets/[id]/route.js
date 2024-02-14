import { NextResponse } from "next/server";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers";

export async function DELETE (_, { params }) {
  const id = params.id;

  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase.from('tickets')
    .delete()
    .eq('id', id);

    return NextResponse.json({ error });
}
