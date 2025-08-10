import { body } from 'express-validator';
import dayjs from 'dayjs'

export const milkReceiptValidator = [
  body('dateTime')
    .custom((value) => {
      const isValid = dayjs(value).isValid();
      if (!isValid) {
        throw new Error('Date must be a valid ISO date string');
      }
      return true;
    }),

  body('fat')
    .isFloat({ min: 0 }).withMessage('FAT must be a positive number'),

  body('snf')
    .isFloat({ min: 0 }).withMessage('SNF must be a positive number'),

  body('qty')
    .isFloat({ min: 0 }).withMessage('Quantity must be a positive number'),

  body('rate')
    .isFloat({ min: 0 }).withMessage('Rate must be a positive number')
];
