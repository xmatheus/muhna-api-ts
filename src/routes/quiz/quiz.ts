import * as quiz from "../../controllers/quiz.controller";
import { Router } from "express";
import { STATUS_CODE } from "../../middlewares/error-handler";
import { auth } from "../../middlewares/auth";
import { checkRoles } from "../../middlewares/check-roles";
const router = Router();

router.get("/", auth, checkRoles(["admin"]), async (req, res) => {
    try {
        const quizzes = await quiz.getAll();
        res.status(STATUS_CODE.OK).json(quizzes);
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Erro ao buscar quizzes"
        });
    }
});

router.post("/create", async (req, res) => {
    try {
        const { title, description, questions } = req.body;
        const newQuiz = quiz.create({ title, description, questions });
        return res.status(STATUS_CODE.CREATED).json(newQuiz);
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Erro ao criar quiz"
        });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, questions } = req.body;

    try {
        const updatedQuiz = quiz.update({ id, title, description, questions });
        return res.json(updatedQuiz);
    } catch (error) {
        console.error(error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Erro ao atualizar quiz"
        });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await quiz.deleteById(id);
        res.json({ message: "Quiz excluído com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error"
        });
    }
});

export default router;
