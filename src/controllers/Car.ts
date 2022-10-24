import { Request, Response } from 'express';
import { StatusCodes } from '../errors/customError';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  constructor(private _carService: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const createdCar = await this._carService.create(req.body);
    return res.status(StatusCodes.CREATED).json(createdCar);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const carList = await this._carService.read();
    return res.status(StatusCodes.OK).json(carList);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const foundCar = await this._carService.readOne(req.params.id);
    return res.status(StatusCodes.OK).json(foundCar);
  }

  public async update(req: Request, res: Response<ICar | null>) {
    const updatedCar = await this._carService.update(req.params.id, req.body);
    return res.status(StatusCodes.OK).json(updatedCar);
  }

  public async delete(req: Request, res: Response<ICar | null>) {
    await this._carService.delete(req.params.id);
    return res.status(StatusCodes.NO_CONTENT).end();
  }
}

export default CarController;