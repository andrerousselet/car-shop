import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleModel from '../../../models/Motorcycle';
import { ZodError } from 'zod';
import MotorcycleService from '../../../services/Motorcycle';
import { motorcycleMock, motorcycleMockWithId, newMotorcycleInfo, updatedMotorcycleMockWithId, wrongMotorcycleMock } from '../../mocks/motorcycleMocks';
const { expect } = chai;

describe('Motorcycle Service - \'/motorcycles\'', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(async () => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcycleModel, 'readOne')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(motorcycleModel, 'update')
      .onCall(0).resolves(updatedMotorcycleMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null)
      .onCall(3).resolves(null);
    sinon.stub(motorcycleModel, 'delete')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a motorcycle', () => {
    it('Success', async () => {
      const createdMotorcycle = await motorcycleService.create(motorcycleMock);
      expect(createdMotorcycle).to.deep.equal(motorcycleMockWithId);
    });

    it('Failure - IMotorcycle validation errors', async () => {
      let error: any;
      try {
        await motorcycleService.create(wrongMotorcycleMock);
      } catch (err: any) {
        error = err;
      }
      expect(error).not.to.be.undefined;
      expect(error).to.be.instanceOf(ZodError);
    })
  });

  describe('Listing all motorcycles', () => {
    it('Success', async () => {
      const motorcycleList = await motorcycleService.read();
      expect(motorcycleList).to.deep.equal([motorcycleMockWithId]);
    });
  });

  describe('Searching one motorcycle', () => {
    it('Success', async () => {
      const foundMotorcycle = await motorcycleService.readOne(motorcycleMockWithId._id);
      expect(foundMotorcycle).to.deep.equal(motorcycleMockWithId);
    });

    it('Failure - not found', async () => {
      let error: any;
      try {
        await motorcycleService.readOne('inexisting_id');
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('NotFound');
    });
  });

  describe('Updating a motorcycle', () => {
    it('Success', async () => {
      const updatedMotorcycle = await motorcycleService.update(motorcycleMockWithId._id, newMotorcycleInfo);
      expect(updatedMotorcycle).to.deep.equal(updatedMotorcycleMockWithId);
    });

    it('Failure - empty request', async () => {
      let error: any;
      try {
        await motorcycleService.update('inexisting_id', {});
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('EmptyObject');
    });

    it('Failure - IMotorcycle validation errors', async () => {
      let error: any;
      try {
        await motorcycleService.update(motorcycleMockWithId._id, wrongMotorcycleMock);
      } catch (err: any) {
        error = err;
      }
      expect(error).not.to.be.undefined;
      expect(error).to.be.instanceOf(ZodError);
    })

    it('Failure - not found', async () => {
      let error: any;
      try {
        await motorcycleService.update('inexisting_id', newMotorcycleInfo);
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('NotFound');
    });
  });

  describe('Deleting a motorcycle', () => {
    it('Success', async () => {
      const deletedMotorcycle = await motorcycleService.delete(motorcycleMockWithId._id);
      expect(deletedMotorcycle).to.deep.equal(motorcycleMockWithId);
    });

    it('Failure - not found', async () => {
      let error: any;
      try {
        await motorcycleService.delete('inexisting_id');
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('NotFound');
    });
  });

});