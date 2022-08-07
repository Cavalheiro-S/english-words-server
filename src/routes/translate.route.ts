import { NextFunction, Request, Response, Router } from "express";
import { postTranslateWords } from "../services/MicrosoftTranslator/translate";

const translateRouter = Router();

translateRouter.post("/translate", async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const { word } = req.body;

        if (word) {
            const wordTranslated = await postTranslateWords(word, "pt")
            resp.status(200).send({ wordSource: word, wordTranslated });
        }
        else {
            throw new Error("Error in traslated route");
        }
    }
    catch {
        resp.status(500).send({ message: "Intern server error" })
    }
})

export default translateRouter;