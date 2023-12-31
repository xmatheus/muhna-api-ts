import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel from "../database/mongo/models/user";
import { CustomRequest } from "../types/auth";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(
            token,
            process.env.SECRET as string
        ) as JwtPayload;
        const user = await UserModel.findOne({ _id: decoded.id });

        if (!user) {
            throw Error();
        }

        (req as unknown as CustomRequest).token = decoded;
        (req as unknown as CustomRequest).user = user;

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send("Please authenticate");
    }
};
