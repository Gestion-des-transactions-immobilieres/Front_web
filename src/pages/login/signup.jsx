import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
  });

  const maxSelection = 3;

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      email: formData.email,
      password: formData.password,
      nom: formData.login,
    };
  
    try {
      const response = await fetch("http://localhost:8080/utilisateurs/intermediaires", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Succès :", result);
      alert("Utilisateur inscrit avec succès !");
    } catch (error) {
      console.error("Erreur :", error);
      alert("Une erreur s'est produite. Vérifiez le backend.");
    }
  };
  

  return (
    <>
     
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          marginBottom: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Nom */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="nom">Nom :</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Mot de passe */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>


          {/* Bouton de soumission */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "rgb(60,107,216)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
