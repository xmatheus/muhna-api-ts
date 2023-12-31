import { Choice } from "@prisma/client";

export interface CustomQuestion {
    id: string;
    choices: Choice[];
}

export type Question = {
    id: string;
    text: string;
    choices: Choice[];
    createdAt: Date;
    updatedAt: Date;
};

export interface CreateProps {
    title: string;
    description: string;
    questions: Question[];
}

export interface UpdateProps extends CreateProps {
    quizId: string;
}
