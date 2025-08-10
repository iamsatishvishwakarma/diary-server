import { IUser } from "./request/user.type";
import { MongoSessionRequest } from "./request/authenticated-request.type";

declare global {
  namespace Express {
     interface Request {
      session: MongoSessionRequest['session'];
      user?: IUser;
    }
  }
}