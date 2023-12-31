import mongoose from "mongoose";
import bcrypt from "bcrypt";

export type Roles = "admin" | "user";

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    roles: Array<Roles>;
}

const UserSchema: mongoose.Schema<UserDocument> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: Array<Roles>
});

const saltRounds = 8;

UserSchema.pre("save", async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;
