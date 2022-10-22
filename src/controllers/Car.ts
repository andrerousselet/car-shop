import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  constructor(private _carService: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const createdCar = await this._carService.create(req.body);
    return res.status(201).json(createdCar);
  }
}

export default CarController;