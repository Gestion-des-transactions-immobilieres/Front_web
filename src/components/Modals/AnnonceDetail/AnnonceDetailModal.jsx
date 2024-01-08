import React, { useState } from "react";
import axios from "axios";  
import { useStateContext } from "../../../context/ContextProvider";

const AnnonceDetails = ({ isOpen, onClose, annonceDetails,etat,fetchAnnonces }) => {
  const {user} = useStateContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const goToPreviousImage = () => {
    const newIndex =
      (currentImageIndex - 1 + annonceDetails.imgs.length) %
      annonceDetails.imgs.length;
    setCurrentImageIndex(newIndex);
  };

  const goToNextImage = () => {
    const newIndex = (currentImageIndex + 1) % annonceDetails.imgs.length;
    setCurrentImageIndex(newIndex);
  };

  const handleReserver = (annonceId) => {
    axios
      .put(`http://localhost:3002/annonces/Reserve_annonce/${annonceId}/${user.id}`)
      .then((res) => {
        console.log("Réussi !");
        onClose();
        setShowConfirmModal(false);
        if (fetchAnnonces !== undefined) {
          fetchAnnonces();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="modal-content bg-white mx-auto my-8 p-6 rounded-lg relative max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-4">{annonceDetails.title}</h2>
        <button
          className="absolute top-5 right-5 text-3xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <p className="mb-2">{annonceDetails.description}</p>
        <p className="mb-2">Prix : {annonceDetails.price}</p>
        <p className="mb-2">Type de bien : {annonceDetails.annonce.type_bien}</p>
        <p className="mb-4">
          Type d'opération : {annonceDetails.type_operation}
        </p>
       
        <div className="relative w-full">
          <img
            src={annonceDetails.imgs[currentImageIndex]}
            alt={`img${currentImageIndex}`}
            className="rounded-lg w-full h-auto object-cover shadow-md mx-auto mb-4"
            style={{ maxHeight: "70vh" }}
          />
          {annonceDetails.imgs.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4">
              <button
                onClick={goToPreviousImage}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg"
              >
                Image précédente
              </button>
              <button
                onClick={goToNextImage}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg"
              >
                Image suivante
              </button>
            </div>
          )}
        </div>
        {etat == "inter" && (
        <button
          className="px-2 py-1 mr-2 text-white  bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={() => setShowConfirmModal(true)}
        >
          Reserver
        </button>
         )} 
        {/* Autres détails de l'annonce */}
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="modal-content bg-white mx-auto my-8 p-6 rounded-lg relative max-w-xl w-full">
            <h2 className="text-2xl font-semibold mb-4">Confirmation</h2>
            <p className="mb-4">Êtes-vous sûr de vouloir réserver ?</p>
            <button
              className="px-2 py-1 mr-2 text-white  bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => handleReserver(annonceDetails.annonce.id)}
            >
              Oui
            </button>
            <button
              className="px-2 py-1 mr-2 text-white  bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => setShowConfirmModal(false)}
            >
              Non
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnonceDetails;