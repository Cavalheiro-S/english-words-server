import express, { urlencoded } from "express"
import cors from "cors";
import wordsRoute from "./routes/words.route";
import translateRouter from "./routes/translate.route";
import exampleRouter from "./routes/example.route";

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use("/words",wordsRoute, translateRouter, exampleRouter);

app.listen(PORT, () => {
    console.log("Server listen on Port: " + PORT);
})
