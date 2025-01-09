import React, { useState } from "react";
import AnnonceModal from "../Modals/AnnonceDetail/AnnonceDetailModal";

const DishesCard = ({ etat, fetchAnnonces, ...props }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.imgs.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? props.imgs.length - 1 : prevIndex - 1
    );
  };

  const hasMultipleImages = props.imgs.length > 1;

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img
          src={props.imgs[currentImageIndex]}
          alt="Dish"
          style={styles.image}
        />
        {hasMultipleImages && (
          <div style={styles.imageControls}>
            <button style={styles.controlButton} onClick={prevImage}>
              {"<"}
            </button>
            <button style={styles.controlButton} onClick={nextImage}>
              {">"}
            </button>
          </div>
        )}
      </div>
      <h3 style={styles.title}>{props.title}</h3>
      <div style={styles.details}>
        <span style={styles.typeOperation}>{props.type_operation}</span>
        <span style={styles.price}>{props.price} DH</span>
      </div>
      <button style={styles.detailsButton} onClick={openModal}>
        Détails
      </button>
      <AnnonceModal
        isOpen={showModal}
        onClose={closeModal}
        annonceDetails={props}
        etat={etat}
        fetchAnnonces={fetchAnnonces}
      />
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    margin: "10px",
    width: "250px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  imageControls: {
    position: "absolute",
    top: "50%",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    transform: "translateY(-50%)",
  },
  controlButton: {
    background: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    cursor: "pointer",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "16px 0 8px",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    marginBottom: "16px",
    padding: "0 10px",
  },
  typeOperation: {
    color: "#666",
  },
  price: {
    fontWeight: "bold",
    color: "#333",
  },
  detailsButton: {
    padding: "10px 16px",
    backgroundColor: "rgb(60,107,216)",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default DishesCard;
