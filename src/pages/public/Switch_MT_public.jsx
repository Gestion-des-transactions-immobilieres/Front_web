import React, { useState, useEffect } from "react";
import MapComponent_public from "./MapComponent_public";
import ListPage from "./Liste";
import axios from "axios";
import { Select, AutoComplete } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Annonces_map_livre from "../intermediaire/Annonces_intermediaire";

const App = ({ url, filtre,etat }) => {



  const [showMap, setShowMap] = useState(true);

  const handleMapButtonClick = () => {
    setShowMap(true);
  };

  const handleListButtonClick = () => {
    setShowMap(false);
  };

  const [annonces, setAnnonces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [annoncesPerPage] = useState(6);
  const [communesOptions, setCommunesOptions] = useState([]);

  const [selectedCommune, setSelectedCommune] = useState(null);

  const [typesBien, setTypesBien] = useState([null]);
  const [typesOperation, setTypesOperation] = useState([null]);

  const [selectedCommuneId, setSelectedCommuneId] = useState(null);
  const [displayedCommuneName, setDisplayedCommuneName] = useState(null);

  useEffect(() => {
    fetchAnnonces();
    fetchTypesBien();
    fetchTypesOperation();
  }, []);

  const initialFilterParams = {
    typeBien: "",
    operationType: "",
    minSurface: "",
    maxSurface: "",
    minPrix: "",
    maxPrix: "",
  };

  const [filterParams, setFilterParams] = useState(initialFilterParams);

  const resetFilters = () => {
    setFilterParams(initialFilterParams);
    setSelectedCommune(null); // Réinitialiser la commune sélectionnée à null
    setSelectedCommuneId(null); // Réinitialiser l'ID de la commune sélectionnée à null
    setDisplayedCommuneName(null); // Réinitialiser le nom de la commune affichée à null
  };

  const fetchAnnonces = () => {
    axios
      .get(`http://localhost:3002/annonces/${url}`)
      .then((res) => {
        setAnnonces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function fetchCommunes(debutNom) {
    console.log("first ", debutNom); // Vérifiez que debutNom a la valeur attendue ici
    try {
      const response = await axios.get(
        `http://localhost:3002/communes/search/${encodeURIComponent(debutNom)}`
      );
      setCommunesOptions(response.data);
      console.log("response ", response); // Vérifiez que debutNom a la valeur attendue ici
      console.log("first ", debutNom); // Vérifiez que debutNom a la valeur attendue ici
    } catch (error) {
      console.error("Erreur lors de la requête fetchCommunes :", error);
    }
  }

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
      const response = await axios.get("http://localhost:3002/operations/type");
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
    const params = {
      ...filterParams,
      commune: selectedCommune,
      communeId: selectedCommuneId || null,
    };
    console.log(params);
    axios
      .post(`http://localhost:3002/annonces/${filtre}`, params)
      .then((res) => {
        setAnnonces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-0 ml-20 mr-6 grid grid-cols-4 gap-1">
  {/* Sidebar des filtres */}
  <div className="shadow-md rounded px-6 pt-4 pb-8 mb-4 flex flex-col bg-blue-100 col-span-1">
    <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
      Filtrer les annonces
    </h2>
    <div className="flex flex-col gap-2">
      <select
        name="typeBien"
        value={filterParams.typeBien ? filterParams.typeBien : ""}
        onChange={handleFilterChange}
        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500"
      >
        <option value="">Type de bien</option>
        {typesBien.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        name="operationType"
        value={filterParams.operationType}
        onChange={handleFilterChange}
        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500"
      >
        <option value="">Type d'opération</option>
        {typesOperation.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Surface minimale"
        name="minSurface"
        value={filterParams.minSurface}
        onChange={handleFilterChange}
        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500"
      />
      <input
        type="number"
        placeholder="Surface maximale"
        name="maxSurface"
        value={filterParams.maxSurface}
        onChange={handleFilterChange}
        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500"
      />
      <input
        type="number"
        placeholder="Prix minimal"
        name="minPrix"
        value={filterParams.minPrix}
        onChange={handleFilterChange}
        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500"
      />
      <input
        type="number"
        placeholder="Prix maximal"
        name="maxPrix"
        value={filterParams.maxPrix}
        onChange={handleFilterChange}
        className="border rounded-lg p-2 focus:outline-none focus:border-blue-500"
      />
      <AutoComplete
        className="h-full text-center"
        options={communesOptions.map((commune) => ({
          label: commune.commune,
          value: commune.id,
        }))}
        onSearch={(value) => {
          setDisplayedCommuneName(value);
          fetchCommunes(value);
        }}
        onSelect={(value, option) => {
          setDisplayedCommuneName(option.label);
          setSelectedCommuneId(value);
          setFilterParams({
            ...filterParams,
            debutNom: option.label,
            communeId: value,
          });
        }}
        placeholder="Rechercher une commune"
        value={displayedCommuneName}
      />
      <div className="flex items-center justify-center gap-2">
  {/* Bouton de réinitialisation */}
  <button
    onClick={resetFilters}
    className="rounded-full w-8 h-8 bg-blue-400 hover:bg-blue-600 text-white focus:outline-none flex items-center justify-center"
  >
    <CloseOutlined style={{ fontSize: "16px" }} />
  </button>

  {/* Bouton Filtrer */}
  <button
    onClick={handleFilterSubmit}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
  >
    Filtrer
  </button>
</div>

    </div>
  </div>

  {/* Section principale */}
  <div className="shadow-md rounded px-6 pt-4 pb-8 mb-4 col-span-3 bg-blue-50">
    <div className="flex justify-center mb-4">
      <button
        onClick={handleMapButtonClick}
        className={`mr-4 px-4 py-2 rounded ${
          showMap ? "bg-blue-500 text-white" : "bg-blue-200 text-blue-700"
        }`}
      >
        Afficher Liste
      </button>
      <button
        onClick={handleListButtonClick}
        className={`px-4 py-2 rounded ${
          !showMap ? "bg-blue-500 text-white" : "bg-blue-200 text-blue-700"
        }`}
      >
        Afficher Carte
      </button>
    </div>
    <div className="flex justify-center mb-4">
      {showMap ? (
        <ListPage
          annonces_props={annonces}
          etat={etat}
          fetchAnnonces={fetchAnnonces}
        />
      ) : (
        <Annonces_map_livre annonces_props={annonces} />
      )}
    </div>
  </div>
</div>

  );
};

export default App;
