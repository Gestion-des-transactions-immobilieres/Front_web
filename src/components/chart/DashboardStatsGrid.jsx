import React from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { useState,useEffect } from 'react'
import axios from "axios";

export default function DashboardStatsGrid() {

 const [Nb_tottale_annonces, setNb_tottale_annonces] = useState(0);
 const [Nb_tottale_demandes, setNb_tottale_demandes] = useState(0);
 const [Nb_tottale_intermediaires, setNb_tottale_intermediaires] = useState(0);
 const [Nb_tottale_citoyens, setNb_tottale_citoyens] = useState(0);

 const fetchNb_totales_annonces = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/statistiques/Nb_Totale_annonces"
      );
      setNb_tottale_annonces(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre totale d annonces :", error);
    }
  };

  useEffect(() => {
    fetchNb_totales_annonces();
  }, []);

  const fetchNb_totales_demandes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/statistiques/Nb_Totale_demandes"
      );
      setNb_tottale_demandes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre totale de demandes :", error);
    }
  };

  useEffect(() => {
    fetchNb_totales_demandes();
  }, []);

  const fetchNb_totales_intermediaires = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/statistiques/Nb_Totale_intermediaires"
      );
      setNb_tottale_intermediaires(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre totale de intermediaires :", error);
    }
  };

  useEffect(() => {
    fetchNb_totales_intermediaires();
  }, []);

  const fetchNb_totales_citoyens = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/statistiques/Nb_Totale_citoyens"
      );
      setNb_tottale_citoyens(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre totale de citoyens :", error);
    }
  };

  useEffect(() => {
    fetchNb_totales_citoyens();
  }, []);



	return (
		<div className="flex gap-4">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoBagHandle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					
					<div className="flex items-center">
						<strong className="text-base text-blue-700 font-semibold">Nombre Totale d'annonces</strong>
						{/* <span className="text-sm text-green-500 pl-2">+343</span> */}
					</div>
					<span className="text-xl text-blue-900 font-semibold">{Nb_tottale_annonces}</span>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-base text-green-600 font-semibold">Nombre Totale de demandes</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{Nb_tottale_demandes}</strong>
						{/* <span className="text-sm text-red-500 pl-2">-43</span> */}
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-lg text-gray-500 font-light">Nombre intermediaire</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{Nb_tottale_intermediaires}</strong>
						{/* <span className="text-sm text-green-500 pl-2">-343</span> */}
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-lg text-gray-500 font-light">Nombre Citoyen </span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{Nb_tottale_citoyens}</strong>
						{/* <span className="text-sm text-red-500 pl-2">-30</span> */}
					</div>
				</div>
			</BoxWrapper>
			
		</div>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}