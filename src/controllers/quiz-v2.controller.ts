import { prismaClient } from "../database/prismaClient";
import { CreateProps, UpdateProps } from "../types/quizv2";

export async function getAll() {
    const quizzes = await prismaClient.quiz.findMany({
        include: {
            questions: {
                include: {
                    choices: true
                }
            }
        }
    });

    return quizzes;
}

export async function create({ title, description, questions }: CreateProps) {
    const quiz = await prismaClient.quiz.create({
        data: {
            title,
            description,
            questions: {
                create: questions.map((question) => ({
                    text: question.text,
                    choices: {
                        create: question.choices.map((choice) => ({
                            text: choice.text,
                            isCorrect: choice.isCorrect
                        }))
                    }
                }))
            }
        },
        include: {
            questions: {
                include: {
                    choices: true
                }
            }
        }
    });

    return quiz;
}

export async function update({
    quizId,
    title,
    description,
    questions
}: UpdateProps) {
    // Verifica se o registro Quiz existe antes de atualizá-lo
    const existingQuiz = await prismaClient.quiz.findUnique({
        where: {
            id: quizId
        }
    });

    if (!existingQuiz) {
        throw new Error("Quiz not found");
    }

    // Atualiza o registro Quiz
    const updatedQuiz = await prismaClient.quiz.update({
        where: {
            id: quizId
        },
        data: {
            title,
            description,
            questions: {
                deleteMany: {},
                create: questions?.map((question) => ({
                    text: question.text,
                    choices: {
                        create: question.choices.map((choice) => ({
                            text: choice.text,
                            isCorrect: choice.isCorrect
                        }))
                    }
                }))
            }
        },
        include: {
            questions: {
                include: {
                    choices: true
                }
            }
        }
    });

    return updatedQuiz;
}

export async function deleteById({ quizId }: Pick<UpdateProps, "quizId">) {
    // Verifica se o registro Quiz existe antes de atualizá-lo
    const questions = await prismaClient.question.findMany({
        where: {
            quizId
        },
        select: {
            id: true,
            choices: true
        }
    });

    for (const question of questions) {
        const choiceIds = question.choices.map((choice) => choice.id);
        await prismaClient.choice.deleteMany({
            where: {
                id: {
                    in: choiceIds
                }
            }
        });
    }

    const questionIds = questions.map((question) => question.id);

    await prismaClient.question.deleteMany({
        where: {
            id: {
                in: questionIds
            }
        }
    });

    // Delete the Quiz record
    await prismaClient.quiz.delete({
        where: { id: quizId }
    });
}
