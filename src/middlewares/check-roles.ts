import { Request, Response, NextFunction } from "express";
import { Roles } from "../database/mongo/models/user";
import { STATUS_CODE } from "./error-handler";
import { CustomRequest } from "../types/auth";

export const checkRoles = (roles: Array<Roles>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as unknown as CustomRequest).user;

            const hasAllRoles = roles.every((item) =>
                user.roles.includes(item)
            );

            if (hasAllRoles) {
                return next();
            }

            throw Error("Not authorized");
        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODE.UNAUTHORIZED).send({ message: err });
        }
    };
};
