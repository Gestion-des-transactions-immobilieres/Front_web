import React from "react";
import { useEffect } from "react";
import axios from 'axios'

const DemandesAnnonceModal = ({annonceId,closeModal}) => {
  const [demandes, setDemandes] = React.useState(null);
  const getDemandes =   () => {

    axios.get(
      `http://localhost:3002/utilisateurs/citoyen_demandeur/${annonceId}`
    ).then((response)=>{console.log(response.data);setDemandes(response.data)})
   
  };
  useEffect( () => {
    getDemandes();
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Demandes pour l'annonce</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200">Demande ID</th>
              <th className="px-4 py-2 bg-gray-200">Date demande</th>
              <th className="px-4 py-2 bg-gray-200">Nom</th>
              <th className="px-4 py-2 bg-gray-200">Penom</th>
              <th className="px-4 py-2 bg-gray-200">Email</th>
            </tr>
          </thead>
          <tbody>
            {demandes && demandes.map((demande,key) => (
              <tr key={key}>
                <td className="px-4 py-2 border-b border-gray-300">
                  {demande.demandeur.id}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {demande.dateDemande
                  }
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {demande.demandeur.nom}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {demande.demandeur.prenom
                  }
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {demande.demandeur.email
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-md mt-4"
          onClick={() => closeModal()}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default DemandesAnnonceModal;
