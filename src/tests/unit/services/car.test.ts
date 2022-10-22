import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId, wrongCarMock } from '../../mocks/carMocks';
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
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a car', () => {
    it('Success', async () => {
      const createdCar = await carService.create(carMock);
      expect(createdCar).to.deep.equal(carMockWithId);
    });

    it('Failure - IVehicle validation errors', async () => {
      let error: any;
      try {
        await carService.create({});
      } catch (err: any) {
        error = err;
      }
      expect(error).not.to.be.undefined;
      expect(error).to.be.instanceOf(ZodError);
    })

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

});