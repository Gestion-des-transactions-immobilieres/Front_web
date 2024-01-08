import React from "react";
import { Routes, Route } from "react-router-dom";

import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/public/Navbar";
import Offres from "../../../pages/public/Offres";
import Review from "../../../pages/public/Review";
import Menu from "../../../pages/public/Menu";
import About from "../../../pages/public/About";
import Home from "../../../pages/public/Home";
import Login from "../../../pages/login/Login";
import Annonces_public from "../../../pages/public/Annonces_public";

import Prix_categorie from "../../../pages/public/Prix_categorie";
import Surface_Categorie from "../../../pages/public/Surface_categorie";
import Operation_Categorie from "../../../pages/public/operation_categorie";
import Bien_Categorie from "../../../pages/public/Bien_categorie";
import MapWithEsriBasemap from "./Map1";

import Switch from "../../../pages/public/Switch_MT_public";

import Dashboard from "../../chart/Dashboard_public";

const PublicLayout = () => {
  return (
    <div className=' bg-gray-100 w-screen min-h-screen relative flex flex-col items-center pl-[2px] py-[2px] pr-2 '>
      <Navbar />
      <main className="flex flex-col gap-2 mt-20 w-full overflow-y-auto" >
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/annonces" element={<Annonces_public />} />
          <Route path="/tableau-bord" element={<Dashboard is_public="oui" />} />

          <Route path="/offres" element={<Offres />} />

          <Route path="/offres/prix/categorie/:id" element={<Prix_categorie  />} />
          <Route path="/offres/surface/categorie/:id" element={<Surface_Categorie/>} />

          <Route path="/offres/operation/vendre" element={<Operation_Categorie operation_categorie="vendre" />} />
          <Route path="/offres/operation/louer" element={<Operation_Categorie operation_categorie="louer" />} />

          <Route path="/offres/bien/maison" element={<Bien_Categorie bien_categorie="maison" />} />
          <Route path="/offres/bien/villa" element={<Bien_Categorie bien_categorie="villa" />} />
          <Route path="/offres/bien/apartement" element={<Bien_Categorie bien_categorie="apartement" />} />

          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Switch url="Annonces_publie" filtre="filtre" etat="public"/>} />
          <Route path="/review" element={<Review />} />
          <Route path="/login" element={<Login />} />
        </Routes>
       
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
