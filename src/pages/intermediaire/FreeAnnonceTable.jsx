import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";

import DishesCard from "../../components/Design/DishesCard";

function AnnonceTable() {
  const [annonces, setAnnonces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [annoncesPerPage] = useState(8);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);

  const { user } = useStateContext();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/annonces/Annonces_pas_encore_reserve_2"
      );
      console.log("helllooo", user);
      setAnnonces(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reserveAnnonce = (annonceId) => {
    axios
      .put(`http://localhost:3002/annonces/Reserve_annonce/${annonceId}/1`)
      .then((res) => {
        console.log("Réussi !");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidateClick = (annonce) => {
    const updatedAnnonces = annonces.map((a) =>
      a.id === annonce.id ? { ...a, status: "Validée" } : a
    );
    setAnnonces(updatedAnnonces);
  };

  const handleReserver = (id) => {
    reserveAnnonce(id);
  };

  const handleViewClick = (annonce) => {
    setSelectedAnnonce(annonce);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const closePopup = () => {
    setSelectedAnnonce(null);
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
  const currentAnnonces = annonces.slice(
    indexOfFirstAnnonce,
    indexOfLastAnnonce
  );

  const totalPages = Math.ceil(annonces.length / annoncesPerPage);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Liste des annonces</h2>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {/* <th className="px-4 py-2 bg-gray-200">Propriétaire</th>
            <th className="px-4 py-2 bg-gray-200">Email</th> */}
            <th className="px-0 py-2 bg-gray-200">Type Bien</th>
            <th className="px-0 py-2 bg-gray-200">Type operation</th>
            <th className="px-0 py-2 bg-gray-200">Prix Bien</th>
            <th className="px-0 py-2 bg-gray-200">Statut</th>
            <th className="px-0 py-2 bg-gray-200">Superficie</th>
            <th className="px-0 py-2 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAnnonces.map((annonce) => (
            <tr key={annonce.annonce.id} className="m-auto">
              <td className="px-12 py-2 border-b border-gray-300">
                {annonce.annonce.type_bien}
              </td>
              <td className="px-12 py-2 border-b border-gray-300">
                {annonce.annonce.type_operation}
              </td>
              <td className="px-12 py-2 border-b border-gray-300">
                {annonce.annonce.prix_bien}
              </td>
              <td className="px-12 py-2 border-b border-gray-300">
                {annonce.annonce.statut}
              </td>
              <td className="px-12 py-2 border-b border-gray-300">
                {annonce.annonce.surface + " m²"}
              </td>
              <td className="px-12 py-2 border-b border-gray-300">
                <div className="flex">
                  <button
                    className="px-2 py-1 mr-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={() => handleReserver(annonce.annonce.id)}
                  >
                    Réserver
                  </button>
                  <button
                    className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleViewClick(annonce)}
                  >
                    Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAnnonce && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <div className="mt-4 flex justify-center w-full h-full ">
              <DishesCard
                imgs={[
                  selectedAnnonce.annonce.photo
                    ? selectedAnnonce.annonce.photo
                        .split(";")
                        .map((url) => url.trim())
                    : ["/assets/img/maison11.jpeg"],
                ]}
                title={selectedAnnonce.annonce.type_bien}
                price={selectedAnnonce.annonce.prix_bien}
                type_operation={selectedAnnonce.annonce.type_operation}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded-md"
                onClick={closePopup}
              >
                Fermermmm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Pagination */}
      <div className="mt-5">
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
    </div>
  );
}

export default AnnonceTable;
