import { ClientSession } from 'mongoose';
import User from '../../../models/v1/user.model';
import { IGetPaginationParams } from '../../../types/common';
import { IUser } from '../../../types/request/user.type';

export const isEmailTaken = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ email });
  return !!user;
};


export interface CreateUserInput extends Omit<IUser, '_id' | 'createdAt' | 'updatedAt'> { }
export async function createUser(data: CreateUserInput, session: ClientSession): Promise<IUser> {
  let user: IUser | null = null;
  user = await getUserByEmail(data.email, session);
  if (user && !user.isAccountVerified) {
    return user
  }
  user = new User(data);
  return await user.save({ session });
}

export const getUserByEmail = async (email: string, session?: ClientSession): Promise<IUser | null> => {
  return await User.findOne({ email }, {}, { session });
};


interface GetUsersParams extends IGetPaginationParams {
  role?: string;
  loggedInUserId: string;
}

export const getAllUsers = async ({
  page = 1,
  limit = 10,
  search = '',
  role,
  loggedInUserId,
}: GetUsersParams) => {
  const query: any = {
    _id: { $ne: loggedInUserId },
  };

  if (role) {
    query.role = role;
  }

  if (search) {
    const regex = new RegExp(search, 'i');
    query.$or = [{ name: regex }, { mobile: regex }];
  }

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(query)
      .select('-password -refreshToken -username')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    User.countDocuments(query),
  ]);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    users
  };
};

export const getUserById = async (id: string) => {
  return await User.findById(id)
    .select('-password -refreshToken -username')
    .lean();
};

export const updateUserById = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
  if (data.email && await isEmailTaken(data.email)) {
    throw new Error('Email is already in use');
  }
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const updateUserByEmail = async (email: string, data: Partial<IUser>, session: ClientSession): Promise<IUser | null> => {
  if (data.email && await isEmailTaken(data.email)) {
    throw new Error('Email is already in use');
  }
  return await User.findOneAndUpdate({ email }, data, { session, new: true }).select('-password -refreshToken');
};
