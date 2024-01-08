import React from "react";
import MapComponent_public from "./MapComponent_public";

const Annonces = () => {
  return (
    <>
      <div className="ml-28 mr-24">
        <div className="sm:ml-2">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 text-center">Liste des annonces pas ecore réservées</div>
          <MapComponent_public />
        </div>
      </div>
    </>
  );
};

export default Annonces;
