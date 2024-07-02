const express =require('express');
const router = express.Router();
const {connectToDb} = require('../db.js')
const ObjectId = require('mongodb').ObjectId;

// GET /student/projects
router.get('/projects',async (req, res) => {
    try{
        const db = await connectToDb();
        const projects = await db.collection("projects").find().toArray();
        // Send the projects as a response
        res.status(200).json(projects);
    }catch(error){
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'An error occurred while fetching projects' });
    } 
    
});

// get a single project
router.get('/projects/:id', async (req, res) => {
    try {
        const db = await connectToDb();
        const project = await db.collection('projects').findOne({ _id: new ObjectId(req.params.id) });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'An error occurred while fetching the project' });
    }
});

module.exports = router;