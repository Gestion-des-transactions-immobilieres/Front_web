import React , { useEffect } from "react";
import MesAnnonceTable from "./MesAnnonceTableArchiver";

const Gestion_mes_annonces_reserve = () => {

  useEffect(() => {
    const user = localStorage.getItem('USER');
    if (!user) {
      localStorage.removeItem('USER');
      window.location.href = '/login'; // Remplacez '/login' par le chemin de votre page de connexion
    }
  }, []);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [data, setData] = React.useState([]); // State to hold your data

  const itemsPerPage = 8; // Define items per page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length); // Limit endIndex to avoid exceeding data length
  const currentPageData = data.slice(startIndex, endIndex);
  

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage); // Update the current page
  };

  return (
    <div className="ml-16 mr-2">
      <div className="sm:ml-2">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {/* Render your table or content using currentPageData */}
          <MesAnnonceTable data={currentPageData} url="Annonces_archiver_par_intermediaire"/>
        </div>
      </div>
    </div>
  );
};

export default Gestion_mes_annonces_reserve;
