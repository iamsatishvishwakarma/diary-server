import { body } from 'express-validator';

export const loginValidator = [
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

export const otpVerificationValidator = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Valid email is required'),
  body('otp').notEmpty().withMessage('OTP is required').isLength({ min: 5, max: 5 }).withMessage('OTP must be 6 digits')
];