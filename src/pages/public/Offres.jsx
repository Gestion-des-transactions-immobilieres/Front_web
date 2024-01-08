import React, { useState, useEffect } from "react";
import DishesCard from "../../components/Design/DishesCard";
import axios from "axios";
import menu1 from "/assets/img/maison11.jpeg";

const Offres = () => {
  const [annonces, setAnnonces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [annoncesPerPage] = useState(6);

  useEffect(() => {
    axios
      .get("http://localhost:3002/annonces/Annonces_publie")
      .then((res) => {
        setAnnonces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  const currentAnnonces = annonces.slice(indexOfFirstAnnonce, indexOfLastAnnonce);

  const totalPages = Math.ceil(annonces.length / annoncesPerPage);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
      <h1 className="text-4xl font-semibold text-center lg:pt-8 pt-24 pb-10">
        Ne laissez pas cette chance passer !
      </h1>
      
      <div className="flex flex-wrap gap-8 justify-center w-full">
        {currentAnnonces.map((annonce) => (
          <DishesCard key={annonce.id} img={menu1} title={annonce.description} price={annonce.prixBien} type_operation={annonce.type_operation}/>
        ))}
      </div>

   {/* Pagination */}
<div className="mt-5">
  <button onClick={handleClickPrev} disabled={currentPage === 1} className="mx-1 px-3 py-1 rounded bg-gray-300 text-gray-600">
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
  <button onClick={handleClickNext} disabled={currentPage === totalPages} className="mx-1 px-3 py-1 rounded bg-gray-300 text-gray-600">
    Suivant
  </button>
</div>

    </div>
  );
};

export default Offres;

