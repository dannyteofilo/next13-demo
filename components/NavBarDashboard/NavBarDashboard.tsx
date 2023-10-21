import React from "react";
import Link from "next/link";

export const NavbarDashboard = () => {
  return (
    <>
      <h2>Navbar</h2>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/dashboard/admin">Dashboard admin</Link>
        </li>
        <li>
          <Link href="/dashboard/products">Dashboard products</Link>
        </li>
      </ul>
    </>
  );
};

export default NavbarDashboard;
