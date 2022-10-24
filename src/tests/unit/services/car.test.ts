import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId, newCarInfo, updatedCarMockWithId, wrongCarMock } from '../../mocks/carMocks';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Car Service - \'/cars\'', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'update')
      .onCall(0).resolves(updatedCarMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null)
      .onCall(3).resolves(null);
    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a car', () => {
    it('Success', async () => {
      const createdCar = await carService.create(carMock);
      expect(createdCar).to.deep.equal(carMockWithId);
    });

    it('Failure - ICar validation errors', async () => {
      let error: any;
      try {
        await carService.create(wrongCarMock);
      } catch (err: any) {
        error = err;
      }
      expect(error).not.to.be.undefined;
      expect(error).to.be.instanceOf(ZodError);
    })
  });

  describe('Listing all cars', () => {
    it('Success', async () => {
      const carList = await carService.read();
      expect(carList).to.deep.equal([carMockWithId]);
    });
  });

  describe('Searching one car', () => {
    it('Success', async () => {
      const foundCar = await carService.readOne(carMockWithId._id);
      expect(foundCar).to.deep.equal(carMockWithId);
    });

    it('Failure - not found', async () => {
      let error: any;
      try {
        await carService.readOne('inexisting_id');
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('NotFound');
    });
  });

  describe('Updating a car', () => {
    it('Success', async () => {
      const updatedCar = await carService.update(carMockWithId._id, newCarInfo);
      expect(updatedCar).to.deep.equal(updatedCarMockWithId);
    });

    it('Failure - empty request', async () => {
      let error: any;
      try {
        await carService.update('inexisting_id', {});
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('EmptyObject');
    });

    it('Failure - ICar validation errors', async () => {
      let error: any;
      try {
        await carService.update(carMockWithId._id, wrongCarMock);
      } catch (err: any) {
        error = err;
      }
      expect(error).not.to.be.undefined;
      expect(error).to.be.instanceOf(ZodError);
    })

    it('Failure - not found', async () => {
      let error: any;
      try {
        await carService.update('inexisting_id', newCarInfo);
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('NotFound');
    });
  });

  describe('Deleting a car', () => {
    it('Success', async () => {
      const deletedCar = await carService.delete(carMockWithId._id);
      expect(deletedCar).to.deep.equal(carMockWithId);
    });

    it('Failure - not found', async () => {
      let error: any;
      try {
        await carService.delete('inexisting_id');
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('NotFound');
    });
  });

});