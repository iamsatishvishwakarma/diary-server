import { Schema, model } from 'mongoose';
import { IMilkReceipt } from '../../types/request/milk.receipt.type';

const milkReceiptSchema = new Schema<IMilkReceipt>(
  {
    dateTime: { type: Date, required: true },
    fat: { type: Number, required: true },
    snf: { type: Number, required: true },
    qty: { type: Number, required: true },
    rate: { type: Number, required: true },
    amount: { type: Number, required: true, default: 0 },
    createdId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

milkReceiptSchema.pre('save', function (next) {
  this.amount = parseFloat((this.qty * this.rate).toFixed(2));
  next();
});

export const MilkReceipt = model<IMilkReceipt>('MilkReceipt', milkReceiptSchema);
