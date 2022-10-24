import { ErrorTypes } from '../errors/customError';
import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _carModel: IModel<IMotorcycle>) {}
  
  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsedCar = motorcycleZodSchema.safeParse(obj);
    if (!parsedCar.success) throw parsedCar.error;
    return this._carModel.create(parsedCar.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._carModel.read();
  }
  
  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const foundCar = await this._carModel.readOne(_id);
    if (!foundCar) throw new Error(ErrorTypes.NotFound);
    return foundCar;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle | null> {
    const objIsEmpty = Object.keys(obj as Record<string, never>).length === 0;
    if (objIsEmpty) throw new Error(ErrorTypes.EmptyObject);
    const parsedCar = motorcycleZodSchema.partial().safeParse(obj);
    if (!parsedCar.success) throw parsedCar.error;
    const updatedCar = await this._carModel.update(_id, parsedCar.data as IMotorcycle);
    if (!updatedCar) throw new Error(ErrorTypes.NotFound);
    return updatedCar;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    const deletedCar = await this._carModel.delete(_id);
    if (!deletedCar) throw new Error(ErrorTypes.NotFound);
    return deletedCar;
  }
}

export default MotorcycleService;