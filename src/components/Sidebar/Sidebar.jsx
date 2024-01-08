import React, { useState } from "react";
// import { adminSidebarLinks } from "../../assets";
import { NavLink } from "react-router-dom";
 import LougoutConfirmation from "../confirmation/logoutConfirmation/logoutConfirmation";

const Sidebar = ({ sideBarLinks ,name }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`${open ? "w-[260px]" : "w-[70px] "
        } bg-emerald-500 dark:bg-dark-bg-main  border-r-[1px] dark:border-gray-700 border-gray-200 h-screen p-3  pt-8 flex flex-col gap-4 fixed left-0 top-0 z-50 duration-300`}
    >
      <div className="flex gap-x-4 items-center">
        <img
          src="https://png.pngtree.com/png-vector/20211106/ourmid/pngtree-letter-p-logo-png-image_4011792.png"
          className={`cursor-pointer h-10 w-10 rounded-full duration-500 ${open && "rotate-[360deg]"
            }`}
        />
        <h1
          className={`font-mono text-2xl dark:text-gray-300 text-gray-800 text-center duration-500 ${!open && "scale-0 opacity-0"
            }`}
        >
           {name}
        </h1>
      </div>
      <ul className="relative pt-6 flex flex-col gap-2 overflow-hidden h-full">
        {sideBarLinks.map((link, index) => (
          <li
            key={index}
          >
            <NavLink to={link.link} className={({ isActive }) => { return `flex   rounded-xl p-2 pl-4 h-10 cursor-pointer  dark:text-gray-300 text-gray-500 text-sm items-center gap-x-4  ${isActive ? "bg-[#22d3ee44]  dark:bg-blue-950" : "dark:bg-light-white bg-gray-100"}`; }} >
              {link.icon}
              <span className={`${!open && "hidden"} origin-left duration-400`}>
                {link.title}
              </span>
            </NavLink>
          </li>
        ))}

        <LougoutConfirmation isSidebarOpen={open} />
      </ul>
    </div>
  );
};

export default Sidebar;
