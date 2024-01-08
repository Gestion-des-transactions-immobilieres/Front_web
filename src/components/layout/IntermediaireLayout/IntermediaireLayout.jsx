import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarAdmin from "../../Navbar/prive/NavbarPrive";
import Sidebar from "../../Sidebar/Sidebar";
import {intermediareSidebarLinks } from "../../../assets/Export-data";
import Gestion_free_annonces from "../../../pages/intermediaire/Annonces_Libre";
import Gestion_mes_annonces_reserve from "../../../pages/intermediaire/Gestion_mes_annonces_reserve"; 
import Dashboard from "../../chart/Dashboard";
import Annonces_map_livre from "../../../pages/intermediaire/Annonces_intermediaire";
import Gestion_mes_annonces_rejete from "../../../pages/intermediaire/Gestion_mes_annonces_rejetee";
import Gestion_mes_annonces_archiver from "../../../pages/intermediaire/Gestion_mes_annonces_archiver";
import Switch_MT from "../../../pages/public/Switch_MT";


const IntermediareLayout = () => {
  return (
    <div className=' bg-gray-100 w-screen min-h-screen relative flex flex-col items-center pl-[2px] py-[2px] pr-2 '>
      <Sidebar sideBarLinks={intermediareSidebarLinks } name="E.intermediare"/>
      <NavbarAdmin />
      <main className="flex flex-col gap-2 mt-14 ml-auto mr-40 w-full overflow-y-auto">
        <Routes>
          <Route index element={<Dashboard/>} />
          <Route path="/tableau-bord" element={<Dashboard  />} />
          {/* <Route path="/map-annonces" element={<Annonces_map_livre />} /> */}
          <Route path="/map-annonces" element={<Switch_MT url="Annonces_pas_encore_reserve" filtre="filtre_intermediaire" etat="inter"/>} />
          <Route path="/annonce-public" element={<Switch_MT url="Annonces_publie" filtre="filtre" etat="inter"/>} />
          <Route path="/annonces-reservees" element={< Gestion_mes_annonces_reserve/>} />
          <Route path="/annonces-rejeter" element={< Gestion_mes_annonces_rejete/>} />
          <Route path="/archivage" element={< Gestion_mes_annonces_archiver/>} />
        </Routes>
      </main>
    </div>
  );
};

export default IntermediareLayout;
