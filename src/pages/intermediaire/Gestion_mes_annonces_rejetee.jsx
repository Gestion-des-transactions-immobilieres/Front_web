import React , { useEffect } from "react";
import MesAnnonceTable from "./MesAnnonceTable";
import MesAnnonceTableRejete from "./MesAnnonceTableRejete";

const Gestion_mes_annonces_rejete = () => {

  useEffect(() => {
    const user = localStorage.getItem('USER');
    if (!user) {
      localStorage.removeItem('USER');
      window.location.href = '/login'; // Remplacez '/login' par le chemin de votre page de connexion
    }
  }, []);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [data, setData] = React.useState([]); 

  const itemsPerPage = 8; 
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentPageData = data.slice(startIndex, endIndex);
  

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="ml-16 mr-2">
      <div className="sm:ml-2">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <MesAnnonceTableRejete data={currentPageData} url="Annonces_rejeter_par_intermediaire_2" />
        </div>
      </div>
    </div>
  );
};

export default Gestion_mes_annonces_rejete;
