import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



function Details() {
const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const data = searchParams.get('data');

  if (!data) {
    return <div>Données non disponibles.</div>;
  }

  const project = JSON.parse(data);



  return (
    
    <div className="container mt-5 border border-dark rounded-2 bg-dark text-white">
         <button onClick={() => navigate(`/`)} className="btn btn-outline-light mt-4" style={{ border: "none" }}> <h1>{'<'}</h1> </button>
      <h2>Details</h2>
      <div>
        <h3>Titre : {project.title}</h3>
        <p>Contenu : {project.content}</p>
        <p>Etat : {project.statut}</p>
      </div>
    </div>
  );
}

export default Details;