export type Question = {
    id: string;
    text: string;
    choices: Choice[];
    createdAt: Date;
    updatedAt: Date;
};

export interface CustomQuestion {
    id: string;
    choices: Choice[];
}

export type Choice = {
    id: string;
    text: string;
    isCorrect: boolean;
    questionId: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface CreateProps {
    title: string;
    description: string;
    questions: Question[];
}

export interface UpdateProps extends CreateProps {
    id: string;
}
