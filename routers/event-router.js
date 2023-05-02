import { Router } from 'express';
import database from '../database.js';
import Model from '../models/Model.js';
import modelconfig from '../models/event-model.js';
import Accessor from '../accessors/Accessor.js';
import Controller from '../controller/Controller.js';

const router = new Router();

//Model
const model = new Model(modelconfig);
//Data accessors
const accessor= new Accessor(model,database);
//Controllers
const controller = new Controller(accessor);
//Endpoints
router.get('/events', (req,res) => controller.get(req,res,null));
router.get('/events/:id', (req,res) => controller.get(req,res,req.params.id,));
router.get('/Venue', (req,res) => controller.get(req,res,'Venue'));
router.get('/LocalBoxer', (req,res) => controller.get(req,res,'LocalBoxer'));
router.get('/ForeignBoxer', (req,res) => controller.get(req,res,'ForeignBoxer'));
router.get('/PrevEvents', (req,res) => controller.get(req,res,'PrevEvents'));
router.get('/UpcomingEvents', (req,res) => controller.get(req,res,'UpcomingEvents'));
router.get('/Referees', (req,res) => controller.get(req,res,'Referees'));

router.post('/events',controller.post);
router.delete('/events/:id',controller.delete);
router.put('/events/:id',controller.put);

export default router;