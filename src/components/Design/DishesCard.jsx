import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import Button from "./Button";

import AnnonceModal from "../Modals/AnnonceDetail/AnnonceDetailModal";


const DishesCard = ({etat,fetchAnnonces, ...props}) => {
  
  console.log("immmm the etat from dishcard",etat);

  console.log(props);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.imgs.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? props.imgs.length - 1 : prevIndex - 1
    );
  };

  const hasMultipleImages = props.imgs.length > 1;

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full lg:w-1/4 p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
      <div className="rounded-xl overflow-hidden">
        <img className="w-full" src={props.imgs[currentImageIndex]} alt="img" />
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-center text-xl pt-6">
          {props.title}
        </h3>
        <div className=" flex flex-row items-center justify-center gap-4">
          <Button title={props.type_operation} />
          <h3 className=" font-semibold text-lg">{props.price}DH</h3>
        </div>
        <div className="flex justify-center gap-4 items-center">
        <button onClick={openModal}>Détails</button>
        </div>

        <AnnonceModal
          isOpen={showModal}
          onClose={closeModal}
          annonceDetails={props}
          etat={etat}
          fetchAnnonces={fetchAnnonces}
        />
        {/* Reste de votre contenu */}
      </div>
      {hasMultipleImages && (
        <div className="flex justify-between mt-4">
          <button onClick={prevImage}>Précédent</button>
          <button onClick={nextImage}>Suivant</button>
        </div>
      )}
    </div>
  );
};

export default DishesCard;