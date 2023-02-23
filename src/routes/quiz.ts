import { Router } from "express";
import Quiz from "../database/mongo/models/quiz";
import Question from "../database/mongo/models/question";
import { STATUS_CODE } from "../middlewares/error-handler";
const router = Router();

router.get("/", async (req, res) => {
    try {
        const quizzes = await Quiz.find({}).populate({
            path: "questions",
            model: Question
        });
        res.status(STATUS_CODE.OK).json(quizzes);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Erro ao buscar quizzes"
        });
    }
});

router.post("/create", async (req, res) => {
    const { title, description, questions } = req.body;

    const quizQuestions = [];

    // Itera sobre as perguntas enviadas no corpo da requisição e cria um novo documento de pergunta para cada uma
    for (const question of questions) {
        const { text, choices } = question;
        const newQuestion = new Question({ text, choices });
        await newQuestion.save();
        quizQuestions.push(newQuestion);
    }

    const newQuiz = new Quiz({
        title,
        description,
        questions: quizQuestions
    });
    await newQuiz.save();

    res.status(STATUS_CODE.CREATED).json(newQuiz);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, questions } = req.body;

    try {
        const quiz = await Quiz.findById(id);

        if (!quiz) {
            res.status(STATUS_CODE.NOT_FOUND).json({
                message: "Quiz não encontrado"
            });
            return;
        }

        quiz.title = title;
        quiz.description = description;
        quiz.questions = [];

        for (const question of questions) {
            const { id: questionId, text, choices } = question;

            // Se a pergunta já existir no banco de dados, atualiza-a, caso contrário, cria uma nova pergunta
            if (questionId) {
                const existingQuestion = await Question.findById(questionId);

                if (existingQuestion) {
                    existingQuestion.text = text;
                    existingQuestion.choices = choices;
                    await existingQuestion.save();

                    quiz.questions.push(existingQuestion._id);
                }
            } else {
                const newQuestion = new Question({ text, choices });
                await newQuestion.save();

                quiz.questions.push(newQuestion._id);
            }
        }

        await quiz.save();

        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error"
        });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const quiz = await Quiz.findById(id);

        if (!quiz) {
            res.status(STATUS_CODE.NOT_FOUND).json({
                message: "Quiz não encontrado"
            });
            return;
        }

        for (const question of quiz.questions) {
            await Question.findByIdAndDelete(question._id);
        }

        await quiz.delete();

        res.json({ message: "Quiz excluído com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error"
        });
    }
});

export default router;
