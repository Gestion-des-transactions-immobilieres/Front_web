import React, { useEffect, useState } from "react";
import DishesCard from "../../components/Design/DishesCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import menu1 from "/assets/img/maison11.jpeg";

const Surface_Categorie = () => {

  const [annonces, setAnnonces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [annoncesPerPage] = useState(6);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3002/annonces/surface/categorie${id}`)
      .then((res) => {
        setAnnonces(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Calcule l'index de la dernière annonce de la page
  const indexOfLastAnnonce = currentPage * annoncesPerPage;
  // Calcule l'index de la première annonce de la page
  const indexOfFirstAnnonce = indexOfLastAnnonce - annoncesPerPage;
  // Sélectionne les annonces de la page actuelle
  const currentAnnonces = annonces.slice(indexOfFirstAnnonce, indexOfLastAnnonce);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
    <h1 className="text-4xl font-semibold text-center lg:pt-8 pt-24 pb-10">
      Ne laissez pas cette chance passer !
    </h1>
    
    <div className="flex flex-wrap gap-8 justify-center w-full">
      {currentAnnonces.length>0 ? currentAnnonces.map((annonce) => (
        <DishesCard key={annonce.id} img={menu1} title={annonce.description} price={annonce.prixBien} type_operation={annonce.type_operation}/>
      ))
      : <p className="my-40">vide...</p>
 
      
      
    }
    </div>

    {/* Pagination */}
    <div className="mt-5">
      {Array.from({ length: Math.ceil(annonces.length / annoncesPerPage) }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>
  );
};

export default Surface_Categorie;
