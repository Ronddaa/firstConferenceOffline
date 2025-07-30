import createHttpError from "http-errors";
import { unifiedusersCollection } from "../db/models/unifiedusers.js";

export const createunifieduser = async (payload) => {
  const unifieduserData = await unifiedusersCollection.create(payload);
  return unifieduserData;
};

export const getunifieduserById = async (id) => {
  if (!id) {
    throw createHttpError(400, "unifieduser ID is required");
  }
  const unifieduserData = await unifiedusersCollection.findById(id);
  if (!unifieduserData) {
    throw createHttpError(404, `unifieduser with id ${id} not found`);
  }
  return unifieduserData;
};

export const getAllunifiedusers = async () => {
  const unifiedusersData = await unifiedusersCollection.find();
  return unifiedusersData;
};

export const updateunifieduserById = async (unifieduserId, updatePayload) => {
  const updatedunifieduser = await unifiedusersCollection.findByIdAndUpdate(
    unifieduserId,
    updatePayload,
    { new: true }
  );

  if (!updatedunifieduser) {
    throw createHttpError(
      404,
      `unifieduser with id ${unifieduserId} not found`
    );
  }

  return updatedunifieduser;
};
