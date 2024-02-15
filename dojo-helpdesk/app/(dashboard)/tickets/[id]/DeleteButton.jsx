'use client'
// import { useRouter } from "next/navigation";
// import { useState } from "react"
import { useTransition } from "react";
import { deleteTicket } from "../actions";

import { TiDelete } from "react-icons/ti"

export default function DeleteButton({ id }) {
  const [isPending, startTransition] = useTransition(false);

  // const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  // const handleClick = async () => {
  //   setIsLoading(true);

  //   console.log('Deleting ticket:', id);
  //   const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
  //     method: 'DELETE'
  //   });

  //   const json = await res.json();

  //   if (json.error) {
  //     console.error('Error deleting ticket:', json.error);
  //     setIsLoading(false);
  //   } else {
  //     router.refresh();
  //     router.push('/tickets');
  //   }
  // }

  return (
    <button 
      className="btn-primary"
      //onClick={handleClick}
      onClick={() => startTransition(() => deleteTicket(id))}
      disabled={isPending}
    >
      {isPending ? 
        <>
          <TiDelete />
          Deleting...
        </>
      :
        <>
          <TiDelete />
          Delete Ticket
        </>
      }
    </button>
  )
}
