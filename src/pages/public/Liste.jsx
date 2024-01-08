import React, { useState, useEffect } from "react";
import axios from "axios";
import DishesCard from "../../components/Design/DishesCard";
import menu1 from "/assets/img/maison11.jpeg";

const Liste = ({ annonces_props ,etat,fetchAnnonces}) => {

  console.log("immmm the etat from list",etat);


  const [currentPage, setCurrentPage] = useState(1);
  const [annoncesPerPage] = useState(6);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterParams({ ...filterParams, [name]: value });
  };

  const handleFilterSubmit = () => {
    axios
      .post("http://localhost:3002/annonces/filtre", filterParams)
      .then((res) => {
        setAnnonces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <div className="min-h-screen  flex flex-col justify-center items-center ">
      {/* <h1 className="text-4xl font-semibold text-center  pb-2">
        Ne laissez pas cette chance passer !
      </h1> */}
      {/* Pagination */}
      <div className="mt-2 pb-2 ">
        <button
          onClick={handleClickPrev}
          disabled={currentPage === 1}
          className="mx-1 px-3 py-1 rounded bg-gray-300 text-gray-600"
        >
          Précédent
        </button>
        <input
          type="number"
          value={currentPage}
          onChange={(e) => {
            const page = parseInt(e.target.value);
            if (page > 0 && page <= totalPages) {
              setCurrentPage(page);
            }
          }}
          className="mx-1 px-3 py-1 rounded bg-gray-300 text-gray-600"
        />
        <span className="mx-1 px-3 py-1 rounded bg-gray-300 text-gray-600">
          / {totalPages}
        </span>
        <button
          onClick={handleClickNext}
          disabled={currentPage === totalPages}
          className="mx-1 px-3 py-1 rounded bg-gray-300 text-gray-600"
        >
          Suivant
        </button>
      </div>

      {/* Affichage de la liste des annonces */}
      <div className="flex flex-wrap gap-8 justify-center w-full">
        {currentAnnonces.map((annonce) => {
          console.log(annonce);
          console.log(annonce.photo);
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
