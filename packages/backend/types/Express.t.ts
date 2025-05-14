import { IUser } from "./User.t";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}