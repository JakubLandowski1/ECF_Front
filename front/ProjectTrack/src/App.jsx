import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState([]);
  const [filter, setFilter] = useState("Tous");

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error("Erreur : ", error);
      });
  }, []);

  const deleteProject = (id) => {
    axios
      .delete(`http://localhost:5000/projects/${id}`)
      .then(() => {
        setResponseData(responseData.filter((elem) => id !== elem.id));
      })
      .catch((error) => {
        console.error("Erreur : ", error);
      });
  };

  const filteredProjects = responseData.filter((project) => {
    if (filter === "Tous") {
      return true; // Afficher tous les projets
    } else {
      return project.statut === filter; // Afficher uniquement les projets correspondant au filtre
    }
  });

  return (
    <div className="container mt-5 pb-5 bg-dark text-white rounded mb-5">
      <div className="d-flex justify-content-between mt-5">
        <h2 className="m-4">Projects</h2>
        <button onClick={() => navigate("/Form")} className="btn btn-success m-4">
          ajouter
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="m-4"
        >
          <option value="Tous">Tous</option>
          <option value="Non debuté">Non Debuté</option>
          <option value="En cours">En cours</option>
          <option value="En Etat">En attente</option>
          <option value="Terminé">Terminé</option>
        </select>
      </div>
      <div className="container">
        {filteredProjects.map((project) => (
          <div key={project.id} className="p-3 bg-secondary text-white rounded m-2 border">
            <h4 className="text-center"> Projet : {project.title} </h4>
            <hr className="bg-white p-1 rounded" />
            
           
            <div className="d-flex bg-secondary text-white rounded justify-content-center">
              <button
                onClick={() => navigate(`/Form?mode=edit&id=${project.id}`)}
                className="btn btn-warning m-2"
              >
                editer
              </button>
              <button onClick={() => deleteProject(project.id)} className="btn btn-danger m-2">
                Supprimer
              </button>
              <button
                onClick={() => navigate(`/details?data=${JSON.stringify(project)}`)}
                className="btn btn-warning m-2"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;