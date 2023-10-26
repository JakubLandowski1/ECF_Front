import {v4 as uuidv4} from 'uuid';
import { resolve } from 'path';
import { readFileSync, writeFileSync} from 'fs';


export class ProjectDao {
    constructor() {
        this.file = resolve('./data/db.json');
        this.projects = [];
    }

    readFile() {
        const fichier = readFileSync(this.file, {encoding: "utf-8"});
        this.projects = JSON.parse(fichier);
    }

    writeFile() {
       writeFileSync(this.file, JSON.stringify(this.projects));
    }

    getAll() {
        return this.projects;
    }

    save(project) {
        project.id = uuidv4();
        this.projects.push(project);
        this.writeFile();
        return project;
    }

    findById(id) {
        return this.projects.find((t) => t.id === id);
    }

    deleteProject(id) {
        this.projects = this.projects.filter((t) => t.id !== id);
        this.writeFile();
    }

    updateProject(projectUpdate) {
        const project = this.findById(projectUpdate.id);
        if (project == undefined) {
            return false
        }
        project.statut = projectUpdate.statut;
        project.title = projectUpdate.title
        project.content = projectUpdate.content
        this.writeFile();
        return true
    }

    updateStatut(id) {
        const project = this.findById(id);
        if (project == undefined) {
            return false
        }
        project.statut = !project.statut;
        this.writeFile();

        return true;
    }

    searchByTitle(title) {
        return this.projects.filter(project => project.title === title)
    }
}