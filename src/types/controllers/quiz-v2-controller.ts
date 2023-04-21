import { Choice } from "@prisma/client";

export interface CustomQuestion {
    id: string;
    choices: Choice[];
}
