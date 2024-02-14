import { notFound } from "next/navigation";

// true (default): Dynamic segments not included in generateStaticParams are generated on demand
// false: Dynamic segments not included in generateStaticParams will return a 404
export const dynamicParams = true;


// by using generateMetadata, we can dynamically generate metadata for each page
export async function generateMetadata({ params }){
  const res = await fetch(`http://localhost:4000/tickets/${params.id}`);
  const ticket = await res.json();

  return {
    title: `Dojo Helpdesk | ${ticket.title}`
  }
}

// by using generateStaticParams, we can statically generate routes at build time
// instead of on-demand at runtime, this can greatly improve performance and SEO
export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/tickets');
  const tickets = await res.json();
  return tickets.map(ticket => ({
    params: {
      id: ticket.id
    }
  }));
}

async function getTicket(id) {
  //imitate delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60
    }
  })

  if (!res.ok) {
    // notFound will cause the page to return a 404 status code
    notFound();
  }

  return res.json()
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="card">
          <h3>{ticket.title}</h3>
          <small>Created by {ticket.user_email}</small>
          <p>{ticket.body}</p>
          <div className={`pill ${ticket.priority}`}>
            {ticket.priority} priority
          </div>
        </div>
        </nav>
    </main>
  )
}
