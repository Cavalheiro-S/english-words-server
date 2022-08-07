import mongoose from "mongoose";
import { IWord } from "../../interface/Models";

const wordSchema = new mongoose.Schema<IWord>({
    name: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    }
})

const Word = mongoose.model("Word", wordSchema);

export default Word;