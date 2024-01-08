import React, { useState, useEffect } from "react";
import axios from "axios";

function OperationTable() {
  const [operations, setOperations] = useState([]);
  const [editingOperation, setEditingOperation] = useState(null);
  const [newType, setNewType] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState("");
  const [confirmFunction, setConfirmFunction] = useState(null);
  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await axios.get('http://localhost:3002/operations');
        setOperations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOperations();
  }, []);


  const handleEditClick = (operation) => {
    setConfirmationAction('edit');
    setConfirmFunction(() => handleEditConfirm(operation));
    setShowConfirmationModal(true);
  };
  const handleEditConfirm = async (operation) => {
    try {
      setEditingOperation(operation);
      setNewType(operation.type);
      setShowAddForm(true);
  
      await axios.put(`http://localhost:3002/operations/${operation.type}`, { type: newType });
  
      const updatedResponse = await axios.get(`http://localhost:3002/operations/${operation.type}`);
      const updatedOperation = updatedResponse.data;
  
      setOperations((prevOperations) => {
        return prevOperations.map((prevOperation) => {
          if (prevOperation.type === updatedOperation.type) {
            return updatedOperation;
          } else {
            return prevOperation;
          }
        });
      });
  
      setShowConfirmationModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDeleteClick = async (type) => {
  //   try {
  //     await axios.delete(`http://localhost:3002/operations/${type}`);
  //     setOperations(operations.filter((operation) => operation.type !== type));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleDeleteClick = (type) => {
    setConfirmationAction('delete');
    setConfirmFunction(() => () => handleDeleteConfirm(type));
    setShowConfirmationModal(true);
  };

  const handleSaveClick = async () => {
    try {
      if (editingOperation) {
        await axios.put(`http://localhost:3002/operations/${editingOperation.type}`, { type: newType });
        setOperations(
          operations.map((operation) => {
            if (operation.type === editingOperation.type) {
              return { type: newType };
            } else {
              return operation;
            }
          })
        );
        setEditingOperation(null);
      } else {
        await axios.post('http://localhost:3002/operations', { type: newType });
        setOperations([...operations, { type: newType }]);
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
    setEditingOperation(null);
    setNewType("");
    setShowAddForm(false);
  };

  const handleDeleteConfirm = async (type) => {
    try {
      await axios.delete(`http://localhost:3002/operations/${type}`);
      setOperations(operations.filter((operation) => operation.type !== type));
      setShowConfirmationModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = () => {
    if (confirmFunction) {
      confirmFunction();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Liste des opérations</h2>
        <button
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={toggleAddForm}
        >
          {showAddForm ? 'Hide Form' : 'Ajouter un type d operation'}
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
          {operations.map((operation) => (
            <tr key={operation.type}>
              <td className="px-4 py-2 border-b border-gray-300">{operation.type}</td>
              <td className="px-4 py-2 border-b border-gray-300">
                <button
                  className="px-2 py-1 mx-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => handleEditClick(operation)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => handleDeleteClick(operation.type)}
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

export default OperationTable;
