import { NextFunction, Request, Response, Router } from "express";
import connection from "../database/connection";
import Word from "../database/models/Word";
import { IWord } from "../interface/Models";

const wordsRoute = Router();

wordsRoute.get("/", async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const uuid = req.query.uuid;
        let wordsFinded: Array<IWord> | IWord | null;
        await connection();
        if (uuid) {
            wordsFinded = await Word.findOne({ _id: uuid });
        }
        else {
            wordsFinded = await Word.find();
        }
        const words = wordsFinded;
        resp.status(200).send(words);
    }
    catch {
        resp.status(500).send()
    }
})

wordsRoute.post("/", async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const { word } = req.body;
        await connection();
        const createdWord = new Word({
            name: word,
            createdDate: new Date()
        })
        await createdWord.save();
        return resp.status(201).json({ message: `Palavra "${createdWord.name}" cadastrada com sucesso` });
    }
    catch {
        return resp.status(500).send({ message: "Palavra não cadastrada" })
    }
})

wordsRoute.delete("/", async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const uuid = req.query.uuid;
        await connection();
        await Word.findOneAndRemove({ _id: uuid })
        return resp.status(200).send({ message: `Palavra com o id ${uuid} removida com sucesso` })
    } catch (error) {
        return resp.status(500).send({ message: "Erro ao remover palavra" })
    }
})

wordsRoute.put("/", async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const uuid = req.query.uuid;
        await connection();
        await Word.findOneAndUpdate()
        return resp.status(200).send({ message: `Palavra com o id ${uuid} atualizada com sucesso` })
    } catch (error) {
        return resp.status(500).send({ message: "Erro ao atualizar palavra" })
    }
})

export default wordsRoute