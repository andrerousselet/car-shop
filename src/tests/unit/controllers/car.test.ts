import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { Request, Response } from 'express';
import { carMock, carMockWithId } from '../../mocks/carMocks';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    
    sinon.stub(carService, 'create').resolves();
  });

  after(()=>{
    sinon.restore();
  })

  describe('POST \'/cars\' - Create car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

});