import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import { motorcycleMock, motorcycleMockWithId, newMotorcycleInfo, updatedMotorcycleMockWithId } from '../../mocks/motorcycleMocks';
const { expect } = chai;

describe('Motorcycle Model - \'/motorcycles\'', () => {
  const motorcycleModel = new MotorcycleModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
    sinon.stub(Model, 'findById').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedMotorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a motorcycle', () => {
    it('Success', async () => {
      const createdMotorcycle = await motorcycleModel.create(motorcycleMock);
      expect(createdMotorcycle).to.deep.equal(motorcycleMockWithId);
    });
  });

  describe('Listing all motorcycles', () => {
    it('Success', async () => {
      const motorcycleList = await motorcycleModel.read();
      expect(motorcycleList).to.deep.equal([motorcycleMockWithId]);
    });
  });

  describe('Searching one motorcycle', () => {
    it('Success', async () => {
      const foundMotorcycle = await motorcycleModel.readOne(motorcycleMockWithId._id);
      expect(foundMotorcycle).to.deep.equal(motorcycleMockWithId);
    });

    it('Failure - invalid id', async () => {
      let error: any;
      try {
        await motorcycleModel.readOne('invalid_id');
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('InvalidId');
    });
  });

  describe('Updating a motorcycle', () => {
    it('Success', async () => {
      const updatedMotorcycle = await motorcycleModel.update(motorcycleMockWithId._id, newMotorcycleInfo);
      expect(updatedMotorcycle).to.deep.equal(updatedMotorcycleMockWithId);
    });

    it('Failure - invalid id', async () => {
      let error: any;
      try {
        await motorcycleModel.update('invalid_id', newMotorcycleInfo);
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('InvalidId');
    });
  });

  describe('Deleting a motorcycle', () => {
    it('Success', async () => {
      const deletedMotorcycle = await motorcycleModel.delete(motorcycleMockWithId._id);
      expect(deletedMotorcycle).to.deep.equal(motorcycleMockWithId);
    });

    it('Failure - invalid id', async () => {
      let error: any;
      try {
        await motorcycleModel.delete('invalid_id');
      } catch (err: any) {
        error = err;
      }      
      expect(error).not.to.be.undefined;
      expect(error.message).to.equal('InvalidId');
    });
  });

});