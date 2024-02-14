import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from 'next/headers';

// old getTickets function, fetched from json-server
// async function getTickets() {
//   // imitate delay
//   await new Promise(resolve => setTimeout(resolve, 2000));
  
//   // nextjs will automatically cache the response unless the revalidate option is set
//   // here we have set it to 0, so the cache will be invalidated on every request
//   // meaning the data will be fetched from the server on every request
//   const response = await fetch('http://localhost:4000/tickets', {
//     next: {
//       revalidate: 0,  // opt out of using cache
//     }
//   });
//   const data = await response.json();
  
//   return data;
// }

async function getTickets() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from('tickets').select();

  if (error) {
    console.error(error);
  }

  return data;
}

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map(ticket => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  )
}
