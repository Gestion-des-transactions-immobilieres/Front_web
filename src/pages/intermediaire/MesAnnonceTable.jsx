import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { set } from "date-fns";
import DemandesAnnonceModal from "../../components/Modals/DemandesAnnonceModal";
import { useStateContext } from "../../context/ContextProvider";

import AnnonceModal from "../../components/Modals/AnnonceDetail/AnnonceDetailModal_second";

function AnnonceTable({ url }) {
  const [annonces, setAnnonces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [annoncesPerPage] = useState(8);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);

  const { user } = useStateContext();
  console.log("immm the happy id.", user.id);

  const [rejectReason, setRejectReason] = useState("");
  const [showRejectPopup, setShowRejectPopup] = useState(false);

  const [showDemandesModal, setShowDemandesModal] = useState(false);
  const [annonceId, setAnnonceId] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState("");
  const [selectedAnnonceId, setSelectedAnnonceId] = useState(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/annonces/${url}/${user.id}`
      );
      setAnnonces(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const PublierAnnonce = (annonceId) => {
    axios
      .put(`http://localhost:3002/annonces/Publier_annonce/${annonceId}`)
      .then((res) => {
        console.log("Réussi !");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendRejectRequest = (id) => {
    axios
      .put(`http://localhost:3002/annonces/Rejeter_annonce/${id}`, {
        motifRejet: rejectReason, // Envoyer le motif de rejet avec la requête
      })
      .then((res) => {
        console.log("Réussi !");
        console.log();
        setShowRejectPopup(false); // Masquer le popup après avoir envoyé la requête
        setRejectReason(""); // Réinitialiser le motif de rejet
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const LibererAnnonce = (annonceId) => {
    axios
      .put(`http://localhost:3002/annonces/Liberer_annonce/${annonceId}`)
      .then((res) => {
        console.log("Réussi !");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ArchiverAnnonce = (annonceId) => {
    axios
      .put(`http://localhost:3002/annonces/archiver_annonce/${annonceId}`)
      .then((res) => {
        console.log("Archivage Réussi !");
        fetchData();
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
  const currentAnnonces = annonces.slice(
    indexOfFirstAnnonce,
    indexOfLastAnnonce
  );

  const totalPages = Math.ceil(annonces.length / annoncesPerPage);

  // const handlePublie = (id) => {
  //   PublierAnnonce(id);
  // };

  // const handleRejeter = (annonce) => {
  //   console.log("immm the annonce rejeterrrrr ", annonce);
  //   setSelectedAnnonce(annonce); // Sélectionner l'annonce complète pour laquelle le rejet est effectué
  //   setShowRejectPopup(true);
  // };

  // const handleLiberer = (id) => {
  //   LibererAnnonce(id);
  // };
  // const handleArchiver = (id) => {
  //   ArchiverAnnonce(id);
  // };

  const handlePublie = (id) => {
    setConfirmationAction("Publier");
    setSelectedAnnonceId(id);
    setShowConfirmationModal(true);
  };

  const handleRejeter = (annonce) => {
    setSelectedAnnonce(annonce);
    setConfirmationAction("Rejeter");
    setSelectedAnnonceId(annonce.annonce.id);
    setShowConfirmationModal(true);
    
  };

  const handleLiberer = (id) => {
    setConfirmationAction("Libérer");
    setSelectedAnnonceId(id);
    setShowConfirmationModal(true);
  };

  const handleArchiver = (id) => {
    setConfirmationAction("Archiver");
    setSelectedAnnonceId(id);
    setShowConfirmationModal(true);
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

  const handleDemandesForAnnonce = async (id) => {
    setShowDemandesModal(true);
    setAnnonceId(id);
  };

  const handleConfirm = (selectedId) => {
    switch (confirmationAction) {
      case "Publier":
        PublierAnnonce(selectedId);
        break;
      case "Rejeter":
        
        setShowRejectPopup(true);
        break;
      case "Libérer":
        LibererAnnonce(selectedId);
        break;
      case "Archiver":
        ArchiverAnnonce(selectedId);
        break;
      default:
        break;
    }
    setShowConfirmationModal(false);
  };
  
  return (
    <>
      {showDemandesModal && (
        <DemandesAnnonceModal
          annonceId={annonceId}
          closeModal={() => setShowDemandesModal(false)}
        />
      )}
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Liste de mes annonces</h2>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200">Type Bien</th>
              <th className="px-4 py-2 bg-gray-200">Type operation</th>
              <th className="px-4 py-2 bg-gray-200">Etat</th>
              <th className="px-4 py-2 bg-gray-200">Statut</th>
              <th className="px-4 py-2 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAnnonces.map((annonce) => (
              <tr key={annonce.id}>
                <td className="px-4 py-2 border-b border-gray-300">
                  {annonce.annonce.type_bien}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {annonce.annonce.type_operation}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {annonce.annonce.etat}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {annonce.annonce.statut}
                </td>
                <td className="flex items-center border-b border-gray-300">
                  <button
                    className="px-2 py-1 mr-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={() => handlePublie(annonce.annonce.id)}
                  >
                    Publier
                  </button>
                  <button
                    className="px-2 py-1 mr-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => handleRejeter(annonce)}
                  >
                    Rejeter
                  </button>
                  <button
                    className="px-2 mx-2 py-1 text-white bg-amber-500 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700"
                    onClick={() => handleLiberer(annonce.annonce.id)}
                  >
                    Libérer
                  </button>

                  <button
                    className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      handleViewClick(annonce);
                      openModal();
                    }}
                  >
                    Détails
                  </button>
                  <button
                    className="px-2 py-1 mx-2 text-white bg-lime-500 rounded-md hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleDemandesForAnnonce(annonce.annonce.id)}
                  >
                    demandes
                  </button>
                  <button
                    className="px-2 mx-2 py-1 text-white bg-zinc-500 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700"
                    onClick={() => handleArchiver(annonce.annonce.id)}
                  >
                    Archiver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Popup */}
        {selectedAnnonce && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <AnnonceModal
                  isOpen={showModal}
                  onClose={closeModal}
                  onClose1={closePopup}
                  imgs={
                    selectedAnnonce.annonce.photo
                      ? selectedAnnonce.annonce.photo
                          .split(";")
                          .map((url) => url.trim())
                      : ["/assets/img/maison11.jpeg"]
                  }
                  justificatif={
                    selectedAnnonce.annonce.justificatif
                      ? selectedAnnonce.annonce.justificatif
                          .split(";")
                          .map((url) => url.trim())
                      : []
                  }
                  annonceDetails={selectedAnnonce}
                  etat="public"
                  // fetchAnnonces={selectedAnnonce}
                />
                <h2 className="text-xl font-semibold mb-4">
                  Détails de l'annonce
                </h2>
                <p className="mb-2">
                  <strong>Description:</strong>{" "}
                  {selectedAnnonce.annonce.description}
                </p>
                <p className="mb-2">
                  <strong>Date annonce:</strong>{" "}
                  {selectedAnnonce.annonce.date_annonce}
                </p>
                <p className="mb-2">
                  <strong>Type bien:</strong>{" "}
                  {selectedAnnonce.annonce.type_bien}
                </p>
                <p className="mb-2">
                  <strong>Type Opération:</strong>{" "}
                  {selectedAnnonce.annonce.type_operation}
                </p>
                <p className="mb-2">
                  <strong>Prix bien:</strong>{" "}
                  {selectedAnnonce.annonce.prix_bien}
                </p>
                {/* Ajoutez d'autres détails de l'annonce ici */}
              </div>
              <div className="bg-gray-100 px-4 py-3 flex justify-end">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  onClick={closePopup}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {showConfirmationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="modal-content bg-white mx-auto my-8 p-6 rounded-lg relative max-w-xl w-full">
              <h2 className="text-2xl font-semibold mb-4">Confirmation</h2>
              <p className="mb-4">
                Êtes-vous sûr de vouloir {confirmationAction} ?
              </p>
              <button
                className="px-2 py-1 mr-2 text-white  bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() => handleConfirm(selectedAnnonceId)}
              >
                Oui
              </button>
              <button
                className="px-2 py-1 mr-2 text-white  bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => setShowConfirmationModal(false)}
              >
                Non
              </button>
            </div>
          </div>
        )}

        {showRejectPopup && (
          <div className="fixed top-1/4 left-1/4 w-1/2 h-auto bg-white z-10 rounded-lg border border-gray-300">
            <div className="bg-white p-6 rounded-lg">
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Motif de rejet..."
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              ></textarea>
              <div className="flex justify-between">
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => {
                    sendRejectRequest(selectedAnnonce.annonce.id);
                  }}
                >
                  Rejeter
                </button>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  onClick={() => setShowRejectPopup(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

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
      </div>
    </>
  );
}

export default AnnonceTable;
