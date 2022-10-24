import { ErrorTypes } from '../errors/customError';
import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _motorcycleModel: IModel<IMotorcycle>) {}
  
  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsedMotorcycle = motorcycleZodSchema.safeParse(obj);
    if (!parsedMotorcycle.success) throw parsedMotorcycle.error;
    return this._motorcycleModel.create(parsedMotorcycle.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycleModel.read();
  }
  
  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const foundMotorcycle = await this._motorcycleModel.readOne(_id);
    if (!foundMotorcycle) throw new Error(ErrorTypes.NotFound);
    return foundMotorcycle;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle | null> {
    const objIsEmpty = Object.keys(obj as Record<string, never>).length === 0;
    if (objIsEmpty) throw new Error(ErrorTypes.EmptyObject);
    const parsedMotorcycle = motorcycleZodSchema.partial().safeParse(obj);
    if (!parsedMotorcycle.success) throw parsedMotorcycle.error;
    const updatedMotorcycle = await this._motorcycleModel
      .update(_id, parsedMotorcycle.data as IMotorcycle);
    if (!updatedMotorcycle) throw new Error(ErrorTypes.NotFound);
    return updatedMotorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    const deletedMotorcycle = await this._motorcycleModel.delete(_id);
    if (!deletedMotorcycle) throw new Error(ErrorTypes.NotFound);
    return deletedMotorcycle;
  }
}

export default MotorcycleService;