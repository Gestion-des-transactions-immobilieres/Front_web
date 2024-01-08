import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "../../Navbar/prive/NavbarPrive";
import Sidebar from "../../Sidebar/Sidebar";
import { adminSidebarLinks } from "../../../assets/Export-data";
import Gestion_intermediare from "../../../pages/admin/Gestion_intermediare";
import Gestion_biens from "../../../pages/admin/Gestion_biens";
import Gestion_operation from "../../../pages/admin/Gestion_operations";


const AdminLayout = () => {
  return (
    <div className=' bg-gray-100 w-full h-full relative flex flex-col items-center pl-[2px] py-[2px] pr-2 '>
      <Sidebar sideBarLinks={adminSidebarLinks} name="E.Admin"/>
      <NavbarAdmin />
      <main className="flex flex-col gap-2 mt-24 mr-40 w-full overflow-y-auto">
        <Routes>
          <Route index element={<Gestion_intermediare />} />
          <Route path="/intermediaires" element={<Gestion_intermediare />} />
          <Route path="/typeBien" element={<Gestion_biens />} />
          <Route path="/typeOperation" element={<Gestion_operation />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
