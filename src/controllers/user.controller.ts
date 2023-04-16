import UserModel from "../database/mongo/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getAll() {
    return await UserModel.find();
}

export async function login(email: string, password: string) {
    const foundUser = await UserModel.findOne({ email: email });

    if (!foundUser) {
        throw new Error("Name of user is not correct");
    }

    const isMatch = bcrypt.compareSync(password, foundUser.password);

    if (isMatch) {
        const token = jwt.sign(
            { id: foundUser.id },
            process.env.SECRET as string,
            {
                expiresIn: 20 // expires in 5min
            }
        );

        return token;
    } else {
        throw new Error("Login error");
    }
}
