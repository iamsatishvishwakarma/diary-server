import { createMilkReceipt, getAllReceiptsWithUsers } from "../../services/database.services/v1/milk.receipt.service";
import { ControllerHandler } from "../../types/express";
import { AuthenticatedRequest } from "../../types/request/authenticated-request.type";
import { IMilkReceipt } from "../../types/request/milk.receipt.type";
import { IUser } from "../../types/request/user.type";
import httpError from "../../utils/httpError";
import httpResponse from "../../utils/httpResponse";

export const registerMilkReceiptV1: ControllerHandler<{}, {}, IMilkReceipt> = async (req, res, next): Promise<void> => {

  try {
    const { user } = req as AuthenticatedRequest;
    const { ...rest } = req.body;
    const data = {
      ...rest,
      createdId: user._id
    }

    const newMilkReceipt = await createMilkReceipt(data as IMilkReceipt);

    if (!newMilkReceipt) {
      return httpResponse(req, res, 500, 'Failed to create receipt');
    }
    return httpResponse(req, res, 201, 'Receipt created successfully', newMilkReceipt);

  } catch (error) {
    httpError(next, error, req)
  }
};


export const getAllReceiptsWithUsersV1: ControllerHandler<{}, {}, {}> = async (req, res, next) => {
  try {
    const result = await getAllReceiptsWithUsers();
    return httpResponse(req, res, 200, 'Receipts fetched successfully', result);
  } catch (error) {
    httpError(next, error, req)
  }
}