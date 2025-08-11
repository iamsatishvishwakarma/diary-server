import dayjs from "dayjs";
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

export const getAllReceiptsWithUsers = async ({
  month, // format: 'YYYY-MM'
  day,   // format: 'DD-MM-YYYY'
}: { month?: string; day?: string }) => {

  const filter: any = {};

  if (day) {
    const parsedDay = dayjs(day, 'DD-MM-YYYY', true);
    if (parsedDay.isValid()) {
      filter.dateTime = {
        $gte: parsedDay.startOf('day').toDate(),
        $lte: parsedDay.endOf('day').toDate(),
      };
    }
  } else if (month) {
    const parsedMonth = dayjs(month, 'YYYY-MM', true);
    if (parsedMonth.isValid()) {
      filter.dateTime = {
        $gte: parsedMonth.startOf('month').toDate(),
        $lte: parsedMonth.endOf('month').toDate(),
      };
    }
  }
  return await MilkReceipt.find(filter)
    .populate('createdId', 'name email')
    .sort({ createdAt: -1 })
    .lean()
    .exec();
};


