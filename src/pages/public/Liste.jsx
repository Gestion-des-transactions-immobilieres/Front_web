import React, { useState } from "react";
import axios from "axios";
import DishesCard from "../../components/Design/DishesCard";

const Liste = ({ annonces_props, etat, fetchAnnonces }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const annoncesPerPage = 6;

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickPage = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastAnnonce = currentPage * annoncesPerPage;
  const indexOfFirstAnnonce = indexOfLastAnnonce - annoncesPerPage;
  const currentAnnonces = annonces_props.slice(
    indexOfFirstAnnonce,
    indexOfLastAnnonce
  );

  const totalPages = Math.ceil(annonces_props.length / annoncesPerPage);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* Pagination */}
      <div className="flex items-center space-x-2 my-4">
        {/* Bouton Précédent */}
        <button
          onClick={handleClickPrev}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          &lt;
        </button>

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleClickPage(index + 1)}
            className={`w-8 h-8 flex items-center justify-center rounded-full border ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "border-gray-300 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Bouton Suivant */}
        <button
          onClick={handleClickNext}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-200 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>

      {/* Informations sur les items */}
      <div className="text-sm text-gray-600 mb-4">
        {`${indexOfFirstAnnonce + 1}-${Math.min(
          indexOfLastAnnonce,
          annonces_props.length
        )} of ${annonces_props.length} items`}
      </div>

      {/* Affichage de la liste des annonces */}
      <div className="flex flex-wrap gap-8 justify-center w-full">
        {currentAnnonces.map((annonce) => {
          const imgUrls = annonce.photo
            ? annonce.photo.split(";").map((url) => url.trim())
            : ["/assets/img/maison11.jpeg"];
          return (
            <DishesCard
              key={annonce.id}
              imgs={imgUrls}
              title={annonce.description}
              price={annonce.prix_bien}
              type_operation={annonce.type_operation}
              annonce={annonce}
              etat={etat}
              fetchAnnonces={fetchAnnonces}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Liste;
