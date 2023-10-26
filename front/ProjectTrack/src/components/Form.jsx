import { useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';

const Form = () => {
    const navigate = useNavigate()
    const title = useRef();
    const [param] = useSearchParams();
    const content = useRef();
    const statut = useRef();

    

    const addProject = (e) => {
        e.preventDefault();


        if (param.get('mode') === 'edit') {
            const id = param.get('id')
            axios.put(`http://localhost:5000/projects/${id}`, {
                title: title.current.value,
                content: content.current.value,
                statut: statut.current.value
            })



                .then(() => {
                    navigate("/")
                })
                .catch(error => {
                    console.error("Erreur lors de la mise à jour du projet :", error);
                })
        } else {
            axios.post(`http://localhost:5000/projects`, { title: title.current.value, content: content.current.value, statut: statut.current.value })
                .then(() => {

                }
                )
        }


        navigate("/")
    }




    return (
        <>
            <div className="container mt-5 border border-dark rounded-2 bg-dark text-white">
                <button onClick={() => navigate(`/`)} className="btn btn-outline-light mt-4" style={{ border: "none" }}> <h1>{'<'}</h1> </button>
                <form className="m-4">
                    <div className="form-group row">
                        <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg"> <h3>Titre</h3></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-lg mt-3" ref={title} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg"> <h3>Contenu</h3></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-lg mt-3" ref={content} />
                        </div>
                    </div>
                    <div >
                        <select className="form-select mt-3" aria-label="Default select example" ref={statut}>

                            <option value="Non debuté" >Non Debuté </option>
                            <option value="En cours" > En cours</option>
                            <option value="En Etat" >En attente</option>
                            <option value="Terminé" >Terminé</option>
                        </select>

                    </div>


                    <div className="d-flex justify-content-end">
                        <button onClick={addProject} className="btn btn-primary btn-lg btn-block mt-3 mb-2"> Valider </button>
                    </div>

                </form>
            </div>
        </>
    )
}


export default Form