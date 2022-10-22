import { Router } from 'express';
import CarController from '../controllers/Car';
import Car from '../models/Car';
import CarService from '../services/Car';

const route = Router();

const carModel = new Car();
const carService = new CarService(carModel);
const carController = new CarController(carService);

route.post('/cars', (req, res) => carController.create(req, res));

export default route;