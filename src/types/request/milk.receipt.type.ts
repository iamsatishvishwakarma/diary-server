import { Document, Schema } from "mongoose";

export interface IMilkReceipt extends Document {
  dateTime: Date;
  fat: number;
  snf: number;
  qty: number;
  rate: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  createdId: Schema.Types.ObjectId
}
