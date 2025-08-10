import { ControllerHandler } from '../../types/express';
import { CurrentUserRequestBody, IUser } from '../../types/request/user.type';
import { createUser, getAllUsers, getUserById } from '../../services/database.services/v1/user.service';
import httpError from '../../utils/httpError';
import { hash } from '../../utils/hash';
import httpResponse from '../../utils/httpResponse';
import { cleanFalsyFieldsDeep } from '../../utils/functions/deepClean.util';
import { MongoSessionRequest } from '../../types/request/authenticated-request.type';
import { sendOtpEmail } from './email.controller';

export const registerUserV1: ControllerHandler<{}, {}, IUser> = async (req, res, next): Promise<void> => {

  try {
    const { password } = req.body;

    const { session } = req as MongoSessionRequest;

    const hashedPassword = await hash(password);

    const user = { ...req.body, password: hashedPassword };

    const newUser = await createUser(cleanFalsyFieldsDeep(user as IUser), session);

    if (!newUser) {
      return httpResponse(req, res, 500, 'Failed to create user');
    }
    await sendOtpEmail(newUser.email, newUser.name, session);
    return httpResponse(req, res, 201, 'User created successfully');

  } catch (error) {
    httpError(next, error, req)
  }
};


export const getAllUsersV1: ControllerHandler<{}, {}, IUser> = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = (req.query.search) || '';
    const role = (req.query.role) || '';
    const loggedInUserId = (req as any).user?._id; // from JWT middleware

    const result = await getAllUsers({
      page,
      limit,
      search,
      role,
      loggedInUserId,
    });

    return httpResponse(req, res, 200, 'Users fetched successfully', result)
  } catch (error) {
    httpError(next, error, req)
  }
};


export const getCurrentUserV1: ControllerHandler<{}, {}, CurrentUserRequestBody> = async (req, res, next) => {
  try {
    const userId = (req as any).user._id;

    if (!userId) {
      return httpResponse(req, res, 401, 'User ID not found in request');
    }

    const user = await getUserById(userId);

    if (!user) {
      return httpResponse(req, res, 404, 'User not found');
    }

    return httpResponse(req, res, 200, 'Current user fetched successfully', { user })
  } catch (error) {
    return httpError(next, error, req)
  }
};
