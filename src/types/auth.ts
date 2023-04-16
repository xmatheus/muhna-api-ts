import { JwtPayload } from "jsonwebtoken";
import { UserDocument } from "../database/mongo/models/user";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
    user: UserDocument;
}
