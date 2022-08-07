
import { NextFunction, Request, Response, Router } from "express";
import { postTranslateWords } from "../services/MicrosoftTranslator/translate";
import { getWordsExamples } from "../services/WordsApi/examples";

const exampleRouter = Router();

exampleRouter.get("/examples", async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const { word, examples } = await getWordsExamples(query.word as string);
        resp.status(200).send({ wordSource: word, examples });

    } catch {

        resp.status(500).send({ message: "Error in take examples" })
    }
})

exampleRouter.get("/examples/en_br", async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const { word, examples } = await getWordsExamples(query.word as string);
        const wordTranslated = await postTranslateWords(word, "pt");
        const examplesTranslated = await postTranslateWords(examples, "pt");
        resp.status(200).send({ wordSource: word, wordTranslated, examples: examplesTranslated });

    } catch {

        resp.status(500).send({ message: "Error in take examples" })
    }
})

exampleRouter.get("/examples/br_en", async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const wordSource = query.word as string
        const wordTranslated = await postTranslateWords(wordSource as string, "en");
        const {examples } = await getWordsExamples(wordTranslated[0]);
        resp.status(200).send({ wordSource, wordTranslated, examples });

    } catch {

        resp.status(500).send({ message: "Error in take examples" })
    }
})

export default exampleRouter;