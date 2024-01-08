import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import ReactDOM from "react-dom";

function UserTable() {
  const [intermediaires, setIntermediaires] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "INTERMEDIAIRE",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const getIntermediaires = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/utilisateurs/intermediaires"
        );
        setIntermediaires(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getIntermediaires();
  }, [setIntermediaires]);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setNewUser({ ...user });
  };

  const handleDeleteClick = (user) => {
    setDeletingUser(user);
  };

  const handleDeleteConfirm = async (user) => {
    try {
      await axios.delete(`http://localhost:3002/utilisateurs/${user.id}`);
      setIntermediaires(intermediaires.filter((u) => u.id !== user.id));
      setDeletingUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveClick = async () => {
    try {
      if (editingUser) {
        await axios.put(
          `http://localhost:3002/utilisateurs/${editingUser.id}`,
          newUser
        );
        setIntermediaires(
          intermediaires.map((u) => {
            if (u.id === editingUser.id) {
              return { ...u, ...newUser };
            } else {
              return u;
            }
          })
        );
        setEditingUser(null);
      } else {
        const response = await axios.post(
          "http://localhost:3002/utilisateurs",
          newUser
        );
        setIntermediaires([...intermediaires, response.data]);
        setNewUser({ nom: "", prenom: "", email: "", password: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const renderEditForm = () => {
    if (editingUser) {
      return (
        <Modal
          isOpen={!!editingUser}
          onRequestClose={() => setEditingUser(null)}
        ></Modal>
      );
    }
    return null;
  };
  const renderAddForm = () => {
    if (showAddForm) {
      return (
        <Modal
          isOpen={showAddForm}
          onRequestClose={toggleAddForm}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "0.5rem",
              padding: "2rem",
              width: "50%", // New width
              height: "50%", // New height
            },
          }}
        >
          <form onSubmit={AddnewIntermediaire} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom:
              </label>
              <input
                type="text"
                value={newUser.nom}
                onChange={handleNewUserChange}
                name="nom"
                required
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={handleNewUserChange}
                name="email"
                required
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                value={newUser.password}
                onChange={handleNewUserChange}
                name="password"
                required
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={toggleAddForm}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add User
              </button>
            </div>
          </form>
        </Modal>
      );
    }
    return null;
  };

  const AddnewIntermediaire = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/utilisateurs/intermediaires",
        newUser
      );
      setIntermediaires([...intermediaires, response.data]);
      setNewUser({ nom: "", prenom: "", email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelClick = () => {
    setEditingUser(null);
    setNewUser({ nom: "", prenom: "", email: "", password: "" });
  };

  const handleNewUserChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Liste des intermédiaires</h2>
        <button
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={toggleAddForm}
        >
          {showAddForm ? "Hide Form" : "Ajouter intermediaire"}
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 font-bold text-left border-b-2 border-gray-300">
              Nom
            </th>
            <th className="px-4 py-2 font-bold text-left border-b-2 border-gray-300">
              Email
            </th>
            <th className="px-4 py-2 font-bold text-left border-b-2 border-gray-300">
              Password
            </th>
            <th className="px-4 py-2 font-bold text-left border-b-2 border-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {renderAddForm()}
          {intermediaires.map((intermediaire) => (
            <tr key={intermediaire.id}>
              <td className="px-4 py-2 border-b border-gray-300">
                {intermediaire.nom}
              </td>
              <td className="px-4 py-2 border-b border-gray-300">
                {intermediaire.email}
              </td>
              <td className="px-4 py-2 border-b border-gray-300">
                {intermediaire.password}
              </td>
              <td className="px-4 py-2 border-b border-gray-300">
                <button
                  className="px-2 py-1 mx-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={() => handleEditClick(intermediaire)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => handleDeleteClick(intermediaire)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderAddForm()}
      {renderEditForm()}
      <Modal
        isOpen={!!deletingUser}
        onRequestClose={() => setDeletingUser(null)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f5f5f5",
            borderRadius: "1rem",
            padding: "2rem",
            width: "40%",
            height: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "2rem" }}>
          Confirmation de suppression
        </h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Voulez-vous vraiment supprimer cet utilisateur ?
        </p>
        <div>
          <button
            onClick={() => handleDeleteConfirm(deletingUser)}
            style={{
              backgroundColor: "#ff0000",
              color: "#fff",
              padding: "1rem 2rem",
              marginRight: "1rem",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Confirmer
          </button>
          <button
            onClick={() => setDeletingUser(null)}
            style={{
              backgroundColor: "#ccc",
              color: "#333",
              padding: "1rem 2rem",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Annuler
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default UserTable;
