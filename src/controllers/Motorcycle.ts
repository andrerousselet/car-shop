import { Request, Response } from 'express';
import { StatusCodes } from '../errors/customError';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  constructor(private _carService: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response<IMotorcycle>) {
    const createdMotorcycle = await this._carService.create(req.body);
    return res.status(StatusCodes.CREATED).json(createdMotorcycle);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const motorcycleList = await this._carService.read();
    return res.status(StatusCodes.OK).json(motorcycleList);
  }

  public async readOne(req: Request, res: Response<IMotorcycle | null>) {
    const foundMotorcycle = await this._carService.readOne(req.params.id);
    return res.status(StatusCodes.OK).json(foundMotorcycle);
  }

  public async update(req: Request, res: Response<IMotorcycle | null>) {
    const updatedMotorcycle = await this._carService.update(req.params.id, req.body);
    return res.status(StatusCodes.OK).json(updatedMotorcycle);
  }

  public async delete(req: Request, res: Response<IMotorcycle | null>) {
    await this._carService.delete(req.params.id);
    return res.status(StatusCodes.NO_CONTENT).end();
  }
}

export default MotorcycleController;