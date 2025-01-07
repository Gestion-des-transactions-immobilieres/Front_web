import React, { useState, useEffect } from "react";
import axios from "axios";

function BienTable() {
  const [biens, setBiens] = useState([]);
  const [editingBien, setEditingBien] = useState(null);
  const [newType, setNewType] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  useEffect(() => {
    const getBiens = async () => {
      try {
        const response = await axios.get('http://localhost:3002/bien');
        setBiens(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBiens();
  }, []);
  const handleEditClick = async (bien) => {
    setSelectedType(bien.type);
    setConfirmationAction('edit');
    setShowConfirmationModal(true);
  };

  const handleDeleteClick = async (type) => {
    setSelectedType(type);
    setConfirmationAction('delete');
    setShowConfirmationModal(true);
  };
  const handleConfirm = async () => {
    if (confirmationAction === 'edit') {
      await axios.put(`http://localhost:3002/biens/${selectedType}`, { type: newType });
      setBiens(
        biens.map((b) => {
          if (b.type === selectedType) {
            return { type: newType };
          } else {
            return b;
          }
        })
      );
      setEditingBien(null);
      setNewType("");
    } else if (confirmationAction === 'delete') {
      await axios.delete(`http://localhost:3002/biens/${selectedType}`);
      setBiens(biens.filter((b) => b.type !== selectedType));
    }
    setShowConfirmationModal(false);
  };


  // const handleEditClick = async (bien) => {
    
  //     setEditingBien(bien);
  //     setNewType(bien.type);
  //     setShowAddForm(true);

  // };
  
  // const handleDeleteClick = async (type) => {
  //   try {
  //     await axios.delete(`http://localhost:3002/biens/${type}`);
  //     setBiens(biens.filter((b) => b.type !== type));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSaveClick = async () => {
  //   try {
  //     if (editingBien) {
  //       await axios.put(`http://localhost:3002/biens/${editingBien.type}`, { type: newType });
  //       setBiens(
  //         biens.map((b) => {
  //           if (b.type === editingBien.type) {
  //             return { type: newType };
  //           } else {
  //             return b;
  //           }
  //         })
  //       );
  //       setEditingBien(null);
  //     } else {
  //       await axios.post('http://localhost:3002/biens', { type: newType });
  //       setBiens([...biens, { type: newType }]);
  //       setNewType(""); 
  //       setShowAddForm(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const toggleAddForm = () => {
  //   setShowAddForm(!showAddForm);
  // };
  
  // const handleCancelClick = () => {
  //   setEditingBien(null);
  //   setNewType("");
  // };

  // const handleCancelClick = () => {
  //   setEditingBien(null);
  //   setNewType("");
  //   setShowAddForm(false);
  // };
  const handleSaveClick = async () => {
    try {
      if (editingBien) {
        handleEditClick(editingBien);
      } else {
        await axios.post('http://localhost:3002/biens', { type: newType });
        setBiens([...biens, { type: newType }]);
        setNewType(""); 
        setShowAddForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleCancelClick = () => {
    setEditingBien(null);
    setNewType("");
    setShowAddForm(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Liste des biens</h2>
        <button
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={toggleAddForm}
        >
          {showAddForm ? 'Hide Form' : 'Ajouter un type de bien'}
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 font-bold text-left border-b-2 border-gray-300">Type</th>
            <th className="px-4 py-2 font-bold text-left border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {showAddForm && (
            <tr>
              <td className="px-4 py-2 border-b border-gray-300">
                <input
                  type="text"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  placeholder="Type"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </td>
              <td className="px-4 py-2 border-b border-gray-300">
                <button
                  className="px-2 py-1 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button
                  className="px-2 py-1 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </td>
            </tr>
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
              onClick={handleConfirm}
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
          {biens.map((bien) => (
            <tr key={bien.type}>
              <td className="px-4 py-2 border-b border-gray-300">{bien.type}</td>
              <td className="px-4 py-2  border-b border-gray-300">
                <button
                  className="px-2 py-1 mx-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => handleEditClick(bien)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => handleDeleteClick(bien.type)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BienTable;
