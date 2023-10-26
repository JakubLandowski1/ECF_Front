import express from "express"
import { Project } from "./models/Project.js";
import { ProjectDao } from "./dao/ProjectDao.js";
import cors from 'cors';


const app = express();

const projectDao = new ProjectDao();

app.use(express.json());

app.use(cors())

app.get('/projects', (req, res) => {
    res.json(projectDao.getAll());
})

app.post('/projects/', (req,res) => {
    const {title, content, statut} = req.body;
    let project = new Project(null, title, content, statut);
    res.json(projectDao.save(project))
})

app.get('/projects/:projectId' , (req, res) => {
    let project = projectDao.findById(req.params.projectId)
    if (project == undefined) {
        res.status(404).json({code: 404, message: "aucun projet correspondant trouvé"})
    }
    res.json(project)
})

app.put('/projects/:projectId', (req, res) => {
    const {id , title, content, statut} = req.body;
    if(req.params.projectId != id) res.sendStatus(409)
    let project = new Project(id, title, content, statut);

    projectDao.updateProject(project) ? res.sendStatus(200) : res.status(400).json({code : 400, message: "probleme lors de l'update"})
})

app.delete('/projects/:projectId', (req,res)=> {
    projectDao.deleteProject(req.params.projectId);
    res.sendStatus(200);
})

app.listen(5000, ()=> {
    projectDao.readFile();
    console.log("en cours d'execution")
})