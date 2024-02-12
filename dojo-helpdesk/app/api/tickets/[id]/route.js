import { NextResponse } from "next/server";

// forces the route to be dynamic, so requests are not cached
export const dynamic = 'force-dynamic';

export async function GET(_, { params }) {
  const id = params.id;

  const res = await fetch(`http://localhost:4000/tickets/${id}`);

  const ticket = await res.json();

  // if (!res.ok) {
  //   return NextResponse.json({ error: 'cannot find ticket' }, {
  //     status : 404
  //   })
  // }

  if (!res.ok) {
    return NextResponse.error('Ticket not found', {
      status: 404
    });
  }

  return NextResponse.json(ticket, {
    status : 200
  });
}
