import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMocks';
const { expect } = chai;

describe('Car Model - \'/cars\'', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a car', () => {
    it('Success', async () => {
      const createdCar = await carModel.create(carMock);
      expect(createdCar).to.deep.equal(carMockWithId);
    });
  });

  describe('Listing all cars', () => {
    it('Success', async () => {
      const carList = await carModel.read();
      expect(carList).to.deep.equal([carMockWithId]);
    });
  });

});