import React from "react";
import MapComponent_intermediaire from "./MapComponent_intermediaire";

const Annonces = ({annonces_props}) => {
  return (
    <>
      <div className=" w-full">
        <div className="sm:ml-2">
          <MapComponent_intermediaire annonces_props={annonces_props} />
        </div>
      </div>
    </>
  );
};

export default Annonces;
