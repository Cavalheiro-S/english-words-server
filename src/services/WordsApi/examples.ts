import axios from "axios";
import "dotenv/config";

const getWordsExamples = async (word: string) => {
    const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/examples`
    const headers = {
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPID_API_KEY || ""
    }
    const response = await axios.get<WordExampleServiceResponse>(url, { headers })
    return response.data
}

export { getWordsExamples }