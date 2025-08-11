import { createMilkReceipt, getAllReceiptsWithUsers } from "../../services/database.services/v1/milk.receipt.service";
import { ControllerHandler } from "../../types/express";
import { AuthenticatedRequest } from "../../types/request/authenticated-request.type";
import { IMilkReceipt } from "../../types/request/milk.receipt.type";
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
    const savedMilkReceipt = {
      ...newMilkReceipt.toObject(),
      createdId: {
        _id: user._id,
        name: user.name
      }
    }
    return httpResponse(req, res, 201, 'Receipt created successfully', savedMilkReceipt);

  } catch (error) {
    httpError(next, error, req)
  }
};


export const getAllReceiptsWithUsersV1: ControllerHandler<{}, {}, { month: string, day: string }> = async (req, res, next) => {
  try {
    const { month, day } = req.body
    const result = await getAllReceiptsWithUsers({ month, day });
    return httpResponse(req, res, 200, 'Receipts fetched successfully', result);
  } catch (error) {
    httpError(next, error, req)
  }
}