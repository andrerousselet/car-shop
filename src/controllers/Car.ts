import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  constructor(private _carService: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const createdCar = await this._carService.create(req.body);
    return res.status(201).json(createdCar);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const carList = await this._carService.read();
    return res.status(200).json(carList);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const foundCar = await this._carService.readOne(req.params.id);
    return res.status(200).json(foundCar);
  }
}

export default CarController;