import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId, newCarInfo, updatedCarMockWithId } from '../../mocks/carMocks';
import { ErrorTypes } from '../../../errors/customError';
const { expect } = chai;

describe('Car Model - \'/cars\'', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findById').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
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

  describe('Searching one car', () => {
    it('Success', async () => {
      const foundCar = await carModel.readOne(carMockWithId._id);
      expect(foundCar).to.deep.equal(carMockWithId);
    });

    it('Failure - invalid id', async () => {
      let error: any;
      try {
        await carModel.readOne('invalid_id');
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('InvalidId');
    });
  });

  describe('Updating a car', () => {
    it('Success', async () => {
      const updatedCar = await carModel.update(carMockWithId._id, newCarInfo);
      expect(updatedCar).to.deep.equal(updatedCarMockWithId);
    });

    it('Failure - invalid id', async () => {
      let error: any;
      try {
        await carModel.update('invalid_id', newCarInfo);
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('InvalidId');
    });
  });

  describe('Deleting a car', () => {
    it('Success', async () => {
      const deletedCar = await carModel.delete(carMockWithId._id);
      expect(deletedCar).to.deep.equal(carMockWithId);
    });

    it('Failure - invalid id', async () => {
      let error: any;
      try {
        await carModel.delete('invalid_id');
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('InvalidId');
    });
  });

});