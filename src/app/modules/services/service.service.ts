import { TService } from './service.interface';
import { Service } from './service.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getAllServiceFromDB = async () => {
  const result = await Service.find();
  return result;
};
const getSingleServiceFromDB = async (_id: string) => {
  const result = await Service.findOne({ _id });
  return result;
};
const updateSingleServiceIntoDB = async (_id: string, payload: TService) => {
  const result = await Service.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteSingleServiceIntoDB = async (_id: string) => {
  const result = await Service.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};
export const serviceServices = {
  createServiceIntoDB,
  getAllServiceFromDB,
  getSingleServiceFromDB,
  updateSingleServiceIntoDB,
  deleteSingleServiceIntoDB,
};
