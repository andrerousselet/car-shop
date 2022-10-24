import { IMotorcycle } from '../../interfaces/IMotorcycle';

export const motorcycleMock: IMotorcycle = {
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125
}

export const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: '6354098d86293dae6e3b9c18',
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125
}

export const updatedMotorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: '6354098d86293dae6e3b9c18',
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'blue',
  buyValue: 5000,
  category: 'Street',
  engineCapacity: 125
}

export const newMotorcycleInfo: Partial<IMotorcycle> = {
  color: 'blue',
  buyValue: 5000,
  category: 'Trail',
  engineCapacity: 125
}

export const wrongMotorcycleMock: IMotorcycle = {
  model: 'Fe',
  year: 1850,
  color: 're',
  buyValue: 3500000,
  category: 'Street',
  engineCapacity: -125
}