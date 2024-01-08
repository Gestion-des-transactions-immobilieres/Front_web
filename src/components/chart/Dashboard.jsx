import React , { useEffect } from "react";
import DashboardStatsGrid from "./DashboardStatsGrid";
import TransactionChart from "./TransactionChart";
import RecentOrders from "./RecentOrders";
import BuyerProfilePieChart from "./BuyerProfilePieChart";
import PopularProducts from "./PopularProducts";
import { useStateContext } from "../../context/ContextProvider";

export default function Dashboard({ is_public }) {
  useEffect(() => {
    const user = localStorage.getItem('USER');
    if (!user) {
      localStorage.removeItem('USER');
      window.location.href = '/login'; // Remplacez '/login' par le chemin de votre page de connexion
    }
  }, []);
  return (
    <div className="ml-28 mr-28">
      <div className="flex flex-col gap-4">
        <DashboardStatsGrid />
        <div className="flex flex-row gap-4 w-full">
          <TransactionChart
            datakey="nbAnnonce"
            fill="#ea580c"
            titre="Annonces-Par-Region"
            data_st="statistique_region" // Assurez-vous que cette valeur correspond à votre méthode côté backend
            champ_x="nom_region"
            angle={60}
          />
          <TransactionChart
            datakey="nbDemande"
            fill="#0ea5e9"
            titre="Demandes-Par-Region"
            data_st="statistique_region" // Assurez-vous que cette valeur correspond à votre méthode côté backend
            champ_x="nom_region"
            angle={60}
          />
        </div>
        <div className="flex flex-row gap-4 w-full">
 
          <TransactionChart
            datakey="nombreAnnonces"
            fill="#ea580c"
            titre="Annonces-Par-Mois"
            data_st="statistique_month" // Assurez-vous que cette valeur correspond à votre méthode côté backend
            champ_x="mois"
            angle={0}
          />
        
          <TransactionChart
            datakey="nombreDemandes"
            fill="#0ea5e9"
            titre="Demandes-Par-Mois"
            data_st="statistique_month" // Assurez-vous que cette valeur correspond à votre méthode côté backend
            champ_x="mois"
            angle={0}
          />
        </div>
        <div className="flex flex-row gap-4 w-full">
          <BuyerProfilePieChart />
        </div>
      </div>
    </div>
  );
}
