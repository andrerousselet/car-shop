import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMocks';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('POST \'/cars\'', () => {
    it('should create a car successfully', async () => {
      const createdCar = await carModel.create(carMock);
      expect(createdCar).to.deep.equal(carMockWithId);
    });
  });

});