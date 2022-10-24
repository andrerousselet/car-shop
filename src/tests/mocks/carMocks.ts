import { ICar } from '../../interfaces/ICar';
import { IVehicle } from '../../interfaces/IVehicle';

export const carMock: ICar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
}

export const carMockWithId: ICar & { _id: string } = {
  _id: '6354098d86293dae6e3b9c18',
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
}

export const updatedCarMockWithId: ICar & { _id: string } = {
  _id: '6354098d86293dae6e3b9c18',
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'black',
  buyValue: 4500000,
  seatsQty: 2,
  doorsQty: 4,
}

export const newCarInfo: Partial<ICar> = {
  color: 'black',
  buyValue: 4500000,
  seatsQty: 2,
  doorsQty: 4,
}

export const wrongCarMock: IVehicle = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
}