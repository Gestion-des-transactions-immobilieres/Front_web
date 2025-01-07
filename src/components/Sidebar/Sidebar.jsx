import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LougoutConfirmation from "../confirmation/logoutConfirmation/logoutConfirmation";
import logo from "./icons/logo.jpg";

const Sidebar = ({ sideBarLinks, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`${open ? "w-[260px]" : "w-[70px]"
        } bg-blue-500 dark:bg-blue-900 border-r-[1px] dark:border-blue-800 border-blue-300 h-screen p-3 pt-8 flex flex-col gap-4 fixed left-0 top-0 z-50 duration-300`}
    >
      {/* Logo and Title */}
      <div className="flex gap-x-4 items-center">
      <img
  src={logo} // Utilisation de l'image importée
  className={`cursor-pointer h-10 w-10 rounded-full duration-500 ${
    open && "rotate-[360deg]"
  }`}
  alt="Logo"
/>

        <h1
          className={`font-mono text-2xl text-white text-center duration-500 ${!open && "scale-0 opacity-0"
            }`}
        >
          {name}
        </h1>
      </div>

      {/* Navigation Links */}
      <ul className="relative pt-6 flex flex-col gap-2 overflow-hidden h-full">
        {sideBarLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.link}
              className={({ isActive }) =>
                `flex rounded-xl p-2 pl-4 h-10 cursor-pointer text-white text-sm items-center gap-x-4 ${isActive
                  ? "bg-blue-600"
                  : "bg-blue-400 hover:bg-blue-500"
                }`
              }
            >
              {link.icon}
              <span className={`${!open && "hidden"} origin-left duration-400`}>
                {link.title}
              </span>
            </NavLink>
          </li>
        ))}

        {/* Logout Confirmation */}
        <LougoutConfirmation isSidebarOpen={open} />
      </ul>
    </div>
  );
};

export default Sidebar;
