import React, { useState } from "react";
import axios from "axios";
import { useStateContext } from "../../../context/ContextProvider";

const AnnonceDetails = ({
  isOpen,
  onClose,
  annonceDetails,
  etat,
  fetchAnnonces,
  imgs,
  onClose1,
  justificatif,
}) => {
  console.log("immmm the justificatif", justificatif);

  const { user } = useStateContext();

  console.log("immmm the eatat", etat);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    const newIndex = (currentImageIndex - 1 + imgs.length) % imgs.length;
    setCurrentImageIndex(newIndex);
  };

  const goToNextImage = () => {
    const newIndex = (currentImageIndex + 1) % imgs.length;
    setCurrentImageIndex(newIndex);
  };

  const handleReserver = (annonceId) => {
    axios
      .put(
        `http://localhost:3002/annonces/Reserve_annonce/${annonceId}/${user.id}`
      )
      .then((res) => {
        console.log("Réussi !");
        onClose();
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 pt-5 flex justify-center items-center">
    <div className="modal-content bg-white mx-auto my-8 p-6 rounded-lg relative max-w-6xl w-full max-h-screen overflow-auto">
      <div className="flex flex-row">
          <div className="w-1/2">
            <div className="relative w-full h-full">
              <img
                src={imgs[currentImageIndex]}
                alt={`img${currentImageIndex}`}
                className="rounded-lg w-full h-auto object-cover object-center shadow-md mx-auto mb-4"
                style={{ maxHeight: "90vh" }}
              />
              {imgs.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4">
                  <button
                    onClick={goToPreviousImage}
                    className="px-1 py-0 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    {/* <i class="material-icons">precedent</i> */}
                    <i class="material-icons" style={{ fontSize: "18px" }}>precedante</i>
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="px-1 py-0 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    {/* <i class="material-icons">suivant</i> */}
                    <i class="material-icons" style={{ fontSize: "18px" }}>suivante</i>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-1/4 ml-4">
            <h2 className="text-2xl font-semibold mb-4">
              {annonceDetails.annonce.title}
            </h2>
            <h3 className="text-xl font-semibold mb-2">Informations sur l'annonce</h3>
            <p className="mb-2">
              Description :{annonceDetails.annonce.description}
            </p>
            <p className="mb-2">Nom :{annonceDetails.annonceur.nom}</p>
            <p className="mb-2">Prenom :{annonceDetails.annonceur.prenom}</p>
            <p className="mb-2">email :{annonceDetails.annonceur.email}</p>
            <p className="mb-4">
              Type d'opération : {annonceDetails.annonce.type_operation}
            </p>
            <p className="mb-2">Prix : {annonceDetails.annonce.prix_bien}</p>
            <p className="mb-2">Surface : {annonceDetails.annonce.surface}</p>
            <p className="mb-2">Type : {annonceDetails.annonce.type_bien}</p>
            {annonceDetails.annonce.motif_rejet && (
              <p className="mb-2">
                Motif rejet: {annonceDetails.annonce.motif_rejet}
              </p>
            )}
            {etat == "inter" && (
              <button
                className="px-1 py-0 mr-2 text-xs text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() =>
                  handleReserver(annonceDetails.annonce.annonce.id)
                }
              >
                Reserver
              </button>
            )}
          </div>
          <div className="w-1/4 px-4">
            <h3 className="text-xl font-semibold mb-2 pt-5">Justificatifs</h3>
            {(justificatif || []).map((url, index) => {
              return (
                <div key={index} className="my-4 border-2 border-gray-300 p-2 mb-2 w-full">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {"Justificatif " + (index + 1)}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <button
          className="text-3xl font-bold absolute top-0 right-0 m-6"
          onClick={() => {
            onClose();
            onClose1();
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AnnonceDetails;
