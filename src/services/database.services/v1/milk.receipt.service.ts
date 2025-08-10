import { MilkReceipt } from "../../../models/v1/milk.receipt.model";
import { IMilkReceipt } from "../../../types/request/milk.receipt.type";

export interface CreateMilkReceiptInput extends Omit<IMilkReceipt, '_id' | 'createdAt' | 'updatedAt'> { }
export async function createMilkReceipt(data: CreateMilkReceiptInput): Promise<IMilkReceipt> {
  const milkReceipt = new MilkReceipt(data);
  return await milkReceipt.save();
}

export const getReceiptWithUser = async (receiptId: string) => {
  return await MilkReceipt.findById(receiptId)
    .populate('createdId', 'name email')
    .lean()
    .exec();
};

export const getAllReceiptsWithUsers = async () => {
  return await MilkReceipt.find()
    .populate('createdId', 'name email')
    .sort({ createdAt: -1 })
    .lean()
    .exec();
};


