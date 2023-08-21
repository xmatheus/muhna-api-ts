import { CreateProps, UpdateProps } from "../types/quiz";
import Question from "../database/mongo/models/question";
import Quiz from "../database/mongo/models/quiz";

export async function getAll() {
    const quizzes = await Quiz.find({}).populate({
        path: "questions",
        model: Question
    });

    return quizzes;
}

export async function create({ title, description, questions }: CreateProps) {
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

    return newQuiz;
}

export async function update({
    id,
    title,
    description,
    questions
}: UpdateProps) {
    const quiz = await Quiz.findById(id);

    if (!quiz) {
        throw Error("quiz not foud");
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

    return quiz;
}

export async function deleteById(id: string) {
    const quiz = await Quiz.findById(id);

    if (!quiz) {
        throw Error("quiz not foud");
    }

    for (const question of quiz.questions) {
        await Question.findByIdAndDelete(question._id);
    }

    await quiz.delete();
}
