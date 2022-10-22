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
}

export default CarService;