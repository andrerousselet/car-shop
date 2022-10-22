import { ErrorTypes } from '../errors/customError';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import { vehicleZodSchema } from '../interfaces/IVehicle';

class CarService implements IService<ICar> {
  constructor(private _carModel: IModel<ICar>) {}

  public async create(obj: unknown): Promise<ICar> {
    const parsedVehicle = vehicleZodSchema.safeParse(obj);
    const parsedCar = carZodSchema.safeParse(obj);
    if (!parsedVehicle.success) throw parsedVehicle.error;
    if (!parsedCar.success) throw parsedCar.error;
    const parsed = { ...parsedVehicle.data, ...parsedCar.data };
    return this._carModel.create(parsed);
  }

  public async read(): Promise<ICar[]> {
    return this._carModel.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    const foundCar = await this._carModel.readOne(_id);
    if (!foundCar) throw new Error(ErrorTypes.NotFound);
    return foundCar;
  }
}

export default CarService;