import { Router } from "express";
import { STATUS_CODE } from "../../middlewares/error-handler";
import * as quizV2 from "../../controllers/quiz-v2.controller";
import { CreateProps } from "../../types/quizv2";

const router = Router();

router.get("/", async (req, res) => {
    const quizzes = await quizV2.getAll();
    res.json(quizzes);
});

router.post("/create", async (req, res) => {
    const { title, description, questions } = req.body as CreateProps;

    if (!title || !description || !questions) {
        return res
            .status(STATUS_CODE.BAD_REQUEST)
            .json({ message: "missing body params" });
    }

    const quiz = await quizV2.create({ title, description, questions });

    return res.status(STATUS_CODE.CREATED).json(quiz);
});

router.put("/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const { title, description, questions } = req.body as Partial<CreateProps>;

    if (!quizId || !title || !description || !questions) {
        return res
            .status(STATUS_CODE.BAD_REQUEST)
            .send({ message: "missing params" });
    }

    const updatedQuiz = await quizV2.update({
        quizId,
        title,
        description,
        questions
    });

    res.status(STATUS_CODE.OK).json(updatedQuiz);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await quizV2.deleteById({ quizId: id });
        res.status(STATUS_CODE.NO_CONTENT).send();
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: "quiz delete failed"
        });
    }
});

export default router;
