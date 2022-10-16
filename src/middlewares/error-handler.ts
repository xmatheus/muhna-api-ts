import { NextFunction, Request, Response } from "express";

export const STATUS_CODE = {
    ok: 200,
    movedPermanently: 301,
    found: 302,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    serverError: 500,
    badGateway: 502,
};

function errorHandler(
    error: Error,
    _: Request,
    res: Response,
    next: NextFunction,
) {
    console.error(error);

    return res
        .status(STATUS_CODE.serverError)
        .json({ message: "Internal Server Error" });
}

export default errorHandler;
