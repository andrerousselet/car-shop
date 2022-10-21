import { z } from 'zod';
import { IVehicle } from './IVehicle';

const carZodSchema = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type ICar = IVehicle & z.infer<typeof carZodSchema>;

export { carZodSchema };