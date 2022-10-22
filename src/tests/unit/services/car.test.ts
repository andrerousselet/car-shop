import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId, wrongCarMock } from '../../mocks/carMocks';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('POST \'/cars\' - Create car', () => {
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

});