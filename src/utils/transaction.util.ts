import mongoose, { ClientSession } from 'mongoose';

/**
 * A reusable MongoDB transaction wrapper
 *
 * @param handler - Function that receives the session and performs DB operations
 */
export async function withTransaction<T>(
  handler: (session: ClientSession) => Promise<T>
): Promise<T> {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await handler(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
