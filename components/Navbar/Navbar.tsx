import React from "react";
import Link from "next/link";
import { Routes } from "./navbar.interface";
import { routes } from "@/config/navbar.config";

export const Navbar = () => {

  return (
    <>
      <h2>Navbar</h2>
      <ul>
        {routes.map((route: Routes) => {
          return (
            <li key={route.path}>
              <Link href={route.path}>{route.label}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Navbar;
