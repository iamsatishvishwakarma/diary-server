import { body } from 'express-validator';

export const registerUserValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Valid email is required'),

  body('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage('Role must be admin or user'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('permissions')
    .optional()
    .isArray()
    .withMessage('Permissions must be an array of strings'),

  body('permissions.*')
    .optional()
    .isString()
    .withMessage('Each permission must be a string'),
];
