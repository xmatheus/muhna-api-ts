import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    choices: [
        {
            text: String,
            isCorrect: Boolean
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
