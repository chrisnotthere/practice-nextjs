import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./dojo-logo.png";

export default function NavBar({ user }) {
  // console.log(user)
  
  return (
    <nav>
      <Image 
        src={Logo} 
        width={200} 
        alt={'Dojo Helpdesk Logo'}
        quality={100}
        placeholder="blur"
      />
      <h1>Dojo Helpdesk</h1>
      <Link href={"/"}>Dashboard</Link>
      <Link href={"/tickets"}>Tickets</Link>
      {user && <span>Hello, {user.email}</span>}
    </nav>
  );
}
