import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./MapComponent_public"; // Suppose un composant pour afficher la carte
import ListComponent from "./Liste"; // Suppose un composant pour afficher la liste

const Menu = () => {
  const [annonces, setAnnonces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [annoncesPerPage] = useState(6);
  const [filterParams, setFilterParams] = useState({
    typeBien: "",
    operationType: "",
    minSurface: "",
    maxSurface: "",
    minPrix: "",
    maxPrix: "",
  });
  const [typesBien, setTypesBien] = useState([]);
  const [typesOperation, setTypesOperation] = useState([]);
  const [showMap, setShowMap] = useState(true); // Ajout du state pour basculer entre la carte et la liste

  useEffect(() => {
    fetchAnnonces();
    fetchTypesBien();
    fetchTypesOperation();
  }, []);

  const fetchAnnonces = () => {
    axios
      .get("http://localhost:3002/annonces/Annonces_publie")
      .then((res) => {
        setAnnonces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTypesBien = async () => {
    try {
      const response = await axios.get("http://localhost:3002/biens/type");
      setTypesBien(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTypesOperation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/operations/type"
      );
      setTypesOperation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const currentAnnonces = annonces.slice(
    (currentPage - 1) * annoncesPerPage,
    currentPage * annoncesPerPage
  );

  const totalPages = Math.ceil(annonces.length / annoncesPerPage);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
      <h1 className="text-4xl font-semibold text-center lg:pt-8 pt-24 pb-10">
        Ne laissez pas cette chance passer !
      </h1>

      {/* Vos filtres existants */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-1/2 w-full">
        {/* ... (vos filtres existants) ... */}
      </div>

      {/* Affichage de la carte ou de la liste en fonction de la condition showMap */}
      {showMap ? (
        <MapComponent annonces={currentAnnonces} /> // Utilisez le composant de carte avec les annonces filtrées
      ) : (
        <ListComponent annonces={currentAnnonces} /> // Utilisez le composant de liste avec les annonces filtrées
      )}

      {/* Ajout des boutons pour basculer entre la carte et la liste */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowMap(true)}
          className={`mx-2 px-4 py-2 rounded ${
            showMap
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Afficher Carte
        </button>
        <button
          onClick={() => setShowMap(false)}
          className={`mx-2 px-4 py-2 rounded ${
            !showMap
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Afficher Liste
        </button>
      </div>

      {/* Votre pagination existante */}
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
};

export default Menu;
