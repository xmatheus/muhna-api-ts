import { Router } from "express";
import { STATUS_CODE } from "../../middlewares/error-handler";
import * as user from "../../controllers/user.controller";
import UserModel, { UserDocument } from "../../database/mongo/models/user";
import { auth } from "../../middlewares/auth";
const router = Router();

router.get("/", auth, async (req, res) => {
    try {
        const users = await user.getAll();
        res.status(STATUS_CODE.OK).json(users);
    } catch (error) {
        console.log(error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send();
    }
});

router.post("/auth", async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await user.login(email, password);
        res.status(STATUS_CODE.OK).json({ token });
    } catch (error) {
        console.log(error);
        return res
            .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
            .send({ message: "login error" });
    }
});

router.post("/create", async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;

        const newUser: UserDocument = new UserModel({
            name,
            email,
            password,
            roles
        });

        await newUser.save();

        res.status(STATUS_CODE.CREATED).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(
            "Erro ao salvar usuário no banco de dados."
        );
    }
});

export default router;
