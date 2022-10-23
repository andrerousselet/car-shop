import { ErrorTypes } from '../errors/customError';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarService implements IService<ICar> {
  constructor(private _carModel: IModel<ICar>) {}
  
  public async create(obj: unknown): Promise<ICar> {
    const parsedCar = carZodSchema.safeParse(obj);
    if (!parsedCar.success) throw parsedCar.error;
    return this._carModel.create(parsedCar.data);
  }

  public async read(): Promise<ICar[]> {
    return this._carModel.read();
  }
  
  public async readOne(_id: string): Promise<ICar | null> {
    const foundCar = await this._carModel.readOne(_id);
    if (!foundCar) throw new Error(ErrorTypes.NotFound);
    return foundCar;
  }

  public async update(_id: string, obj: unknown): Promise<ICar | null> {
    const objIsEmpty = Object.keys(obj as Record<string, never>).length === 0;
    if (objIsEmpty) throw new Error(ErrorTypes.EmptyObject);
    const parsedCar = carZodSchema.partial().safeParse(obj);
    if (!parsedCar.success) throw parsedCar.error;
    const updatedCar = await this._carModel.update(_id, parsedCar.data as ICar);
    if (!updatedCar) throw new Error(ErrorTypes.NotFound);
    return updatedCar;
  }
}

export default CarService;